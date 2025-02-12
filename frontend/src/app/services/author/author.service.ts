import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Author, AuthorMin, AuthorUpdate } from '../../types/author.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private baseUrl = 'http://localhost:8080/api/authors';
  private authorsCache: AuthorMin[] | null = null; // memory cache
  private cacheKey = 'authors'; // localStorage key
  private cacheTTL = 5 * 60 * 1000; // cache is valid for 5 minutes (localStorage)

  constructor(private http: HttpClient) {}

  /** obtain author list, using hybrid cache (memory + localStorage) for
   *  fast data retrieving without compromising persistence.
   */
  getAuthors(): Observable<AuthorMin[]> {
    // check memory cache first
    if (this.authorsCache) {
      console.log('Using memory cache for Authors');
      return of(this.authorsCache);
    }

    // if not in memory, check localStorage for cache
    const cachedData = localStorage.getItem(this.cacheKey);
    const cachedTime = localStorage.getItem(`${this.cacheKey}_time`);

    if (cachedData && cachedTime) {
      const elapsedTime = Date.now() - Number(cachedTime);

      if (elapsedTime < this.cacheTTL) {
        console.log('Using localStorage cache for Authors');
        this.authorsCache = JSON.parse(cachedData); // update memory cache
        return of(this.authorsCache as AuthorMin[]); // authorsCache is never null here
      } else {
        console.log('Authors cache expired, retrieving new data...');
      }
    }

    // if there is no cache available, make a new request
    return this.http.get<AuthorMin[]>(this.baseUrl).pipe(
      tap((authors) => {
        this.authorsCache = authors; // update memory cache
        localStorage.setItem(this.cacheKey, JSON.stringify(authors)); // update localStorage
        localStorage.setItem(`${this.cacheKey}_time`, Date.now().toString()); // update localStorage key
      }),
      catchError((error) => {
        console.error('Error fetching Authors:', error);
        return of([]);
      })
    );
  }

  getAuthorById(id: number): Observable<Author> {
    return this.http.get<Author>(`${this.baseUrl}/${id}`);
  }

  createAuthor(author: Author): Observable<Author> {
    return this.http
      .post<Author>(this.baseUrl, author)
      .pipe(tap(() => this.invalidateCache()));
  }

  updateAuthor(id: number, fields: AuthorUpdate): Observable<Author> {
    return this.http
      .put<Author>(`${this.baseUrl}/${id}`, fields)
      .pipe(tap(() => this.invalidateCache()));
  }

  deleteAuthor(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(tap(() => this.invalidateCache()));
  }

  private invalidateCache(): void {
    console.log('Authors cache expired...');
    this.authorsCache = null; // clear memory cache

    // clear localStorage
    localStorage.removeItem(this.cacheKey);
    localStorage.removeItem(`${this.cacheKey}_time`);
  }
}
