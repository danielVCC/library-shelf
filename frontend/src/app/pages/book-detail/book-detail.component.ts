import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book/book.service';

@Component({
  selector: 'app-book-detail',
  imports: [CommonModule],
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
}
