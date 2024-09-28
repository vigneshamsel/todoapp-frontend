import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Category } from '../model/category.model';
import { Observable, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/api/categories`;

  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  categories$: Observable<Category[]> = this.categoriesSubject.asObservable();

  private selectedCategorySubject = new BehaviorSubject<Category | null>(null);
  selectedCategory$= this.selectedCategorySubject.asObservable();

  private httpclient;

constructor(private http_client: HttpClient) {
    this.httpclient=http_client;
 }  

 createCategory(category: Category): Observable<Category> {
  return this.httpclient.post<Category>(this.apiUrl, category).pipe(
    tap(category=>this.categoriesSubject.next([...this.categoriesSubject.value,category]))
  );
 }

 deleteCategory(category: Category){

    return this.httpclient.delete<Category>(`${this.apiUrl}/${category.id}`).pipe(
      tap(()=>{
        console.log(this.categoriesSubject.value);
        const updatedCategories = this.categoriesSubject.value.filter(cat=>cat.id!=category.id)
        this.categoriesSubject.next(updatedCategories);
      })
    );
  
 }

 updateCategory(category: Category): Observable<Category> {
  return this.httpclient.put<Category>(`${this.apiUrl}/${category.id}`, category).pipe(
    tap((updatedCategory)=>{
       const updatedCategories= this.categoriesSubject.value.map(
        category=> category.id === updatedCategory.id?updatedCategory:category
       );
       this.categoriesSubject.next(updatedCategories);

    })
  )
 }


 getCategories(): Observable<Category[]> {
  return this.httpclient.get<Category[]>(this.apiUrl).pipe(
      tap(categories=> this.categoriesSubject.next(categories)));
}

updateSelectedCategory(category: Category) {
  this.selectedCategorySubject.next(category);
}

}
