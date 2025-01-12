import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book/book.service';
import { EditBookModalComponent } from '../../components/edit-book-modal/edit-book-modal.component';
import { ConfirmDeleteModalComponent } from '../../components/confirm-delete-modal/confirm-delete-modal.component';

@Component({
  selector: 'app-book-detail',
  imports: [CommonModule, EditBookModalComponent, ConfirmDeleteModalComponent],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css',
})
export class BookDetailComponent implements OnInit {
  bookId!: number;
  bookDetails: any;
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
    this.bookService.getBookById(this.bookId).subscribe(
      (data) => {
        this.bookDetails = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching book data:', error);
        this.isLoading = false;
      }
    );
  }

  handleSave(updatedFields: {
    title: string;
    authorId: number;
    categoryId: number;
    publishedYear: number;
    description: string;
  }): void {
    this.isLoading = true; // start loading state
    const updatedBook = {
      ...this.bookDetails, // Include existing fields
      ...updatedFields, // Override changed fields
      author: { id: updatedFields.authorId },
      category: { id: updatedFields.categoryId },
    };

    this.bookService.updateBook(this.bookId, updatedBook).subscribe({
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
