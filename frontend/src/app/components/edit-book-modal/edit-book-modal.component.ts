import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthorService } from '../../services/author/author.service';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-edit-book-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-book-modal.component.html',
  styleUrl: './edit-book-modal.component.css',
})
export class EditBookModalComponent {
  @Input() bookDetails: any; // receive book details from parent component
  @Output() onSave = new EventEmitter<any>();

  editForm!: FormGroup;
  tempBookDetails: any = {};
  authors: any[] = [];
  categories: any[] = [];

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
    this.authorService.getAuthors().subscribe(
      (data) => {
        this.authors = data;
      },
      (error) => {
        console.error('Error fetching authors:', error);
      }
    );
  }

  // load categories used in categories dropdown
  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  saveChanges(): void {
    const updatedFields = {
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
