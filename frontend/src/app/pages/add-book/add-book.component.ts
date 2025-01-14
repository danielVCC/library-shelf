import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthorService } from '../../services/author/author.service';
import { CategoryService } from '../../services/category/category.service';
import { BookService } from '../../services/book/book.service';
import { Author } from '../../types/author.model';
import { Category } from '../../types/category.model';

@Component({
  selector: 'app-add-book',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
})
export class AddBookComponent implements OnInit {
  bookForm!: FormGroup;
  authors: Author[] = [];
  categories: Category[] = [];
  isLoadingAuthors: boolean = true;
  isLoadingCategories: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authorService: AuthorService,
    private categoryService: CategoryService,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    // init form
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      publishedYear: [null, [Validators.required, Validators.min(1000)]],
      authorId: [null, Validators.required],
      categoryId: [null, Validators.required],
    });

    // Load Authors and Categories
    this.loadAuthors();
    this.loadCategories();
  }

  // load authors used in authors dropdown
  loadAuthors(): void {
    this.authorService.getAuthors().subscribe({
      next: (data) => {
        this.authors = data;
        this.isLoadingAuthors = false;
      },
      error: (error) => {
        console.error('Error fetching authors:', error);
      },
    });
  }

  // load categories used in categories dropdown
  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.isLoadingCategories = false;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      },
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const formValue = this.bookForm.value;

      const bookData = {
        ...formValue,
        author: { id: formValue.authorId },
        category: { id: formValue.categoryId },
      };

      // Post book with data from bookData
      this.bookService.createBook(bookData).subscribe({
        next: (response) => {
          console.log('Book created:', response);
          this.router.navigate(['/books']); // redirect to books page
        },
        error: (error) => {
          console.error('Error creating book:', error);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
