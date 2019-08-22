import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  searchText='';
  showForm=false;
  editForm = false;
  //creation d'un attribut qui va recoit les donnees du formulaire 
  myTask: Task={
    label:'',
    completed:false
  }
  tasks: Task[]=[];
  resultTasks: Task[]=[];
 
/*pour utiliser le methode findall il faut injecter le service*/
  constructor(private taskService: TaskService) { }

  ngOnInit() {
//chargement de components il se excute dans ngOnInit
this.getTasks();
  }
  //creer une methode pour faire appel a la methode findall qui situe dans le service
  getTasks(){
    this.taskService.findAll()
    //pour communiquer avec un observbale il faut le abndonner en utilisant la methode subscribe 
    //data retourner mn le serveur il v a etre stocker dans l attribut tasks
    //ce methode il va etre excuter au cours de chargement de components
    .subscribe(tasks=> this.resultTasks=this.tasks= tasks)
  }
  //on implemente la methode deletetask
  deleteTask(id){
    this.taskService.delete(id)
    .subscribe(()=> {
      this.tasks= this.tasks.filter(task=>task.id !=id)
    })

  }
  //une fonction qui fait rappel a la methode qui existe dans le service 
  //il va persister et rrtourner data contient le id
persistTask(){
  this.taskService.persist(this.myTask)
  .subscribe((task)=>{
   this.tasks = [task, ...this.tasks]
   this.resetTask();
   //une fois en rempli la formulaire et en fait l ajout la formulaire ca doit disparaitre 
   this.showForm=false;
  })
}
//pour vider la formulaire apres l ajout d 'un objet
resetTask(){
  this.myTask={
    label:'',
    completed:false
  }

}
toggleCompleted(task){
  this.taskService.completed(task.id, task.completed)
  .subscribe(()=> {
    task.completed= !task.completed

  })
}
//la creation de la methdode edit une fois je clique sur un champ il va remplir automatique la formulaire 

editTask(task){
  //lie l objet courant avec la formulaire 
  this.myTask=task
  //changer l etat 
  this.editForm= true;
}
//creation dune methode pour apparaitre le button update 
updateTask(){
  this.taskService.update(this.myTask)
  .subscribe(task=>{
    //initialiser la formulaire avec la methode resetTask
    this.resetTask();
    this.editForm=false;

  })
}
searchTasks(){
  this.resultTasks=this.tasks.filter((task)=> task.label.toLowerCase().includes(this.searchText.toLowerCase()))
}
}
