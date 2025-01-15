import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Book } from '../../types/book.model';
import { BookService } from '../../services/book/book.service';
import { BookListComponent } from '../../components/book-list/book-list.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-books',
  imports: [BookListComponent, LoadingSpinnerComponent, CommonModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent {
  books: Book[] = [];
  isLoading: boolean = true;
  selectedSort: string = 'title'; // initial sort value (title, author, year, updatedAt)

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.isLoading = true;
    this.bookService.getBooks().subscribe(
      (data) => {
        this.books = data;
        this.sortBooks(); // initial sort
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao buscar os livros:', error);
        this.isLoading = false;
      }
    );
  }

  onSortChange(event: Event): void {
    this.selectedSort = (event.target as HTMLSelectElement).value;
    this.sortBooks();
  }

  sortBooks(): void {
    this.books.sort((a, b) => {
      if (this.selectedSort === 'title') {
        return a.title.localeCompare(b.title);
      } else if (this.selectedSort === 'author') {
        return a.author.name.localeCompare(b.author.name);
      } else if (this.selectedSort === 'year') {
        return b.publishedYear - a.publishedYear;
      } else if (this.selectedSort === 'updatedAt') {
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      }
      return 0;
    });
  }
}
