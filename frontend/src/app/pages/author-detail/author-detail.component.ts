import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Author, AuthorUpdate } from '../../types/author.model';
import { Book } from '../../types/book.model';
import { AuthorService } from '../../services/author/author.service';
import { BookService } from '../../services/book/book.service';
import { BookListComponent } from '../../components/book-list/book-list.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { EditAuthorModalComponent } from '../../components/edit-author-modal/edit-author-modal.component';
import { ConfirmDeleteModalComponent } from '../../components/confirm-delete-modal/confirm-delete-modal.component';

@Component({
  selector: 'app-author-detail',
  imports: [
    LoadingSpinnerComponent,
    BookListComponent,
    EditAuthorModalComponent,
    ConfirmDeleteModalComponent,
    CommonModule,
  ],
  templateUrl: './author-detail.component.html',
  styleUrl: './author-detail.component.css',
})
export class AuthorDetailComponent implements OnInit {
  authorId!: number;
  authorDetails?: Author;
  isLoading: boolean = true;
  books: Book[] = [];

  constructor(
    private authorService: AuthorService,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchAuthor();
    this.loadBooksByAuthor();
  }

  fetchAuthor(): void {
    this.authorId = Number(this.route.snapshot.paramMap.get('id'));
    this.authorService.getAuthorById(this.authorId).subscribe({
      next: (data) => {
        this.authorDetails = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.log('Error fetching author data: ', err);
      },
    });
  }

  loadBooksByAuthor(): void {
    this.bookService.getBooksByAuthor(this.authorId).subscribe({
      next: (books: Book[]) => {
        this.books = books;
      },
      error: (err) => {
        console.error('Error fetching books by author:', err);
      },
    });
  }

  // handle edit author for EditAuthorModal
  handleEdit(updatedFields: AuthorUpdate): void {
    this.isLoading = true;

    this.authorService.updateAuthor(this.authorId, updatedFields).subscribe({
      next: (response) => {
        console.log('Author updated successfully:', response);
        this.authorDetails = { ...response };
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error updating author:', err);
        this.isLoading = false;
      },
    });
  }

  // handle delete author for DeleteAuthorModal
  deleteAuthor(): void {
    this.isLoading = true;

    this.authorService.deleteAuthor(this.authorId).subscribe({
      next: () => {
        console.log('Author deleted successfully');
        alert('Author deleted successfully!');
        this.router.navigate(['/authors']);
      },
      error: (error) => {
        console.error('Error deleting author:', error);
        alert('Failed to delete author. Please try again later.');
        this.isLoading = false;
      },
    });
  }
}
