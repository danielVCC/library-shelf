import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Book, BookUpdate, BookMin } from '../../types/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = 'http://localhost:8080/api/books';
  private booksCache: BookMin[] | null = null; // memory cache
  private cacheKey = 'books'; // localStorage key
  private cacheTTL = 5 * 60 * 1000; // cache is valid for 5 minutes

  constructor(private http: HttpClient) {}

  /** obtain book list, using hybrid cache (memory + localStorage) for
   *  fast data retrieving without compromising persistence.
   */
  getBooks(): Observable<BookMin[]> {
    // check memory cache first
    if (this.booksCache) {
      console.log('Using memory cache for books');
      return of(this.booksCache);
    }

    // if not in memory, check localStorage for cache
    const cachedData = localStorage.getItem(this.cacheKey);
    const cachedTime = localStorage.getItem(`${this.cacheKey}_time`);

    if (cachedData && cachedTime) {
      const elapsedTime = Date.now() - Number(cachedTime);

      if (elapsedTime < this.cacheTTL) {
        console.log('Using localStorage cache for books');
        this.booksCache = JSON.parse(cachedData);
        return of(this.booksCache as BookMin[]); // booksCache is never null here
      } else {
        console.log('Books cache expired, retrieving new data...');
      }
    }

    // if there is no cache available, make a new request
    return this.http.get<BookMin[]>(this.baseUrl).pipe(
      tap((books) => {
        this.booksCache = books; // update memory cache
        localStorage.setItem(this.cacheKey, JSON.stringify(books)); // update localStorage
        localStorage.setItem(`${this.cacheKey}_time`, Date.now().toString()); // save time for cache TTL
      }),
      catchError((error) => {
        console.error('Error fetching Books:', error);
        return of([]);
      })
    );
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${id}`);
  }

  getBooksByAuthor(authorId: number): Observable<BookMin[]> {
    return this.http.get<BookMin[]>(`${this.baseUrl}/author/${authorId}`);
  }

  createBook(book: Book): Observable<Book> {
    return this.http
      .post<Book>(this.baseUrl, book)
      .pipe(tap(() => this.invalidateCache()));
  }

  updateBook(id: number, book: BookUpdate): Observable<Book> {
    return this.http
      .put<Book>(`${this.baseUrl}/${id}`, book)
      .pipe(tap(() => this.invalidateCache()));
  }

  deleteBook(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(tap(() => this.invalidateCache()));
  }

  private invalidateCache(): void {
    console.log('Books cache expired');
    this.booksCache = null; // clear memory

    // clear localStorage
    localStorage.removeItem(this.cacheKey);
    localStorage.removeItem(`${this.cacheKey}_time`);
  }
}
