import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  apiUrl="http://localhost:5000/tasks";

  constructor(private http: HttpClient) {}
//methode pour lister les donnees et le retour sera un tableau 
findAll() {
  return this.http.get<Task[]>(this.apiUrl);
   }
   //creation de la methode delete 
   delete(id){
     return this.http.delete(`${this.apiUrl}/${id}`)
   }
   persist(task){
     return this.http.post<Task>(this.apiUrl, task);
   }
   //pour changer une seull objet 
   completed(id,completed){
     return this.http.patch(`${this.apiUrl}/${id}`, {completed: !completed})
   }
   update(task){
     return this.http.put(`${this.apiUrl}/${task.id}`,task)
   }
}
