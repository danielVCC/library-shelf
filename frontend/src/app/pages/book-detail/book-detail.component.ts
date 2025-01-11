import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book/book.service';
import { EditBookModalComponent } from '../../components/edit-book-modal/edit-book-modal.component';

@Component({
  selector: 'app-book-detail',
  imports: [CommonModule, EditBookModalComponent],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css',
})
export class BookDetailComponent implements OnInit {
  bookId!: number;
  bookDetails: any;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    // get book id from params
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));

    // get book details by ID
    this.bookService.getBookById(this.bookId).subscribe(
      (data) => {
        this.bookDetails = data;
      },
      (error) => {
        console.error('Error fetching book data:', error);
      }
    );
  }

  handleSave(updatedFields: {
    title: string;
    description: string;
    publishedYear: number;
    authorId: number;
    categoryId: number;
  }): void {
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
      },
      error: (error) => {
        console.error('Error updating book:', error);
      },
    });
  }
}
