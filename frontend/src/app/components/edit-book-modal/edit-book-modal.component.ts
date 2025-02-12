import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthorService } from '../../services/author/author.service';
import { CategoryService } from '../../services/category/category.service';
import { Book, BookUpdate } from '../../types/book.model';
import { AuthorMin } from '../../types/author.model';
import { CategoryMin } from '../../types/category.model';

@Component({
  selector: 'app-edit-book-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-book-modal.component.html',
  styleUrl: './edit-book-modal.component.css',
})
export class EditBookModalComponent {
  @Input() bookDetails?: Book; // receive book details from parent component
  @Output() onSave = new EventEmitter<any>();

  editForm!: FormGroup;
  authors: AuthorMin[] = [];
  categories: CategoryMin[] = [];
  isLoadingAuthors: boolean = true;
  isLoadingCategories: boolean = true;

  constructor(
    private fb: FormBuilder,
    private authorService: AuthorService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      title: [''],
      author: [''],
      category: [''],
      publishedYear: [''],
      description: [''],
    });
    // load Authors and Categories
    this.loadAuthors();
    this.loadCategories();
  }

  ngOnChanges(): void {
    if (this.bookDetails) {
      this.editForm.patchValue({
        title: this.bookDetails.title,
        author: this.bookDetails.author.id,
        category: this.bookDetails.category.id,
        publishedYear: this.bookDetails.publishedYear,
        description: this.bookDetails.description,
      });
    }
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

  saveChanges(): void {
    const updatedFields: BookUpdate = {
      title: this.editForm.get('title')?.value,
      authorId: this.editForm.get('author')?.value,
      categoryId: this.editForm.get('category')?.value,
      publishedYear: this.editForm.get('publishedYear')?.value,
      description: this.editForm.get('description')?.value,
    };

    // emit updated data to parent component
    this.onSave.emit(updatedFields);
  }
}
