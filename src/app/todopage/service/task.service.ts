import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Category } from '../model/category.model';
import { Observable } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = `${environment.apiUrl}/api/tasks`;

  private httpclient;

  constructor(private http_client: HttpClient) {
      this.httpclient=http_client;
   }  


   getTasks(): Observable<Task[]> {
    return this.httpclient.get<Task[]>(this.apiUrl);
  }

  addTask(task : Task): Observable<Task> {
    return this.httpclient.post<Task>(this.apiUrl,task);
  }
  
  updateTask(task : Task): Observable<Task> {
    return this.httpclient.put<Task>(`${this.apiUrl}/${task.id}`,task);
  }
  deleteTask(task : Task): Observable<Task> {
    return this.httpclient.delete<Task>(`${this.apiUrl}/${task.id}`);
  }
}
