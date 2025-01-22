import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Author } from '../../types/author.model';
import { Book } from '../../types/book.model';
import { BookService } from '../../services/book/book.service';

@Component({
  selector: 'app-author-card',
  imports: [RouterModule],
  templateUrl: './author-card.component.html',
  styleUrl: './author-card.component.css',
})
export class AuthorCardComponent implements OnInit {
  @Input() author!: Author;
  bookCount: number = 0;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooksByAuthor();
  }

  loadBooksByAuthor(): void {
    this.bookService.getBooksByAuthor(this.author.id).subscribe({
      next: (books: Book[]) => {
        this.bookCount = books.length;
      },
      error: (err) => {
        console.error('Error fetching books by author:', err);
      },
    });
  }
}