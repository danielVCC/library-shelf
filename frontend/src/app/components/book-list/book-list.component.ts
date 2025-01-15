import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookCardComponent } from '../book-card/book-card.component';
import { Book } from '../../types/book.model';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule, BookCardComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent {
  @Input() books: Book[] = [];
}
