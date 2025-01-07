import { Component } from '@angular/core';
import { BookListComponent } from '../../components/book-list/book-list.component';

@Component({
  selector: 'app-books',
  imports: [BookListComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent {}
