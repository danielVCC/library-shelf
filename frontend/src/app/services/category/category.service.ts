import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryMin } from '../../types/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<CategoryMin[]> {
    return this.http.get<CategoryMin[]>(`${this.baseUrl}`);
  }

  // getCategoryById(id: number): Observable<Category> {
  //   return this.http.get<Category>(`${this.baseUrl}/${id}`);
  // }
}
