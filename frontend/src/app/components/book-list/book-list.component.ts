import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookService } from '../../services/book/book.service';
import { BookCardComponent } from '../book-card/book-card.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { Book } from '../../types/book.model';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule, BookCardComponent, LoadingSpinnerComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  isLoading: boolean = true;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(
      (data) => {
        this.books = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching books data:', error);
        this.isLoading = false;
      }
    );
  }
}
