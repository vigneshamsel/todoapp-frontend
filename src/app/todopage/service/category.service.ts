import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Category } from '../model/category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/api/categories`;
  private httpclient;

constructor(private http_client: HttpClient) {
    this.httpclient=http_client;
 }  

 createCategory(category: Category): Observable<Category> {
  return this.httpclient.post<Category>(this.apiUrl, category);
 }

 getCategories(): Observable<Category[]> {
  return this.httpclient.get<Category[]>(this.apiUrl);
}

}
