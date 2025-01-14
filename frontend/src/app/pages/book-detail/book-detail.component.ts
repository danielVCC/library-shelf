import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { BookService } from '../../services/book/book.service';
import { Book, BookUpdate } from '../../types/book.model';
import { EditBookModalComponent } from '../../components/edit-book-modal/edit-book-modal.component';
import { ConfirmDeleteModalComponent } from '../../components/confirm-delete-modal/confirm-delete-modal.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-book-detail',
  imports: [
    CommonModule,
    EditBookModalComponent,
    ConfirmDeleteModalComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css',
})
export class BookDetailComponent implements OnInit {
  bookId!: number;
  bookDetails?: Book;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    // get book id from params
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));

    // get book details by ID
    this.bookService.getBookById(this.bookId).subscribe({
      next: (data) => {
        this.bookDetails = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching book data:', error);
        this.isLoading = false;
      },
    });
  }

  // handle save-changes for edit-modal
  handleSave(updatedFields: BookUpdate): void {
    this.isLoading = true; // start loading state

    this.bookService.updateBook(this.bookId, updatedFields).subscribe({
      next: (response) => {
        console.log('Book updated successfully:', response);
        this.bookDetails = { ...response };
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error updating book:', error);
        this.isLoading = false;
      },
    });
  }

  // handle delete for delete-modal
  deleteBook(): void {
    this.isLoading = true;

    this.bookService.deleteBook(this.bookId).subscribe({
      next: () => {
        console.log('Book deleted successfully');
        alert('Book deleted successfully!');
        this.router.navigate(['/books']); // Redireciona para a lista de livros
      },
      error: (error) => {
        console.error('Error deleting book:', error);
        alert('Failed to delete book. Please try again later.');
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
