import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthorService } from '../../services/author/author.service';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-edit-book-modal',
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-book-modal.component.html',
  styleUrl: './edit-book-modal.component.css',
})
export class EditBookModalComponent {
  @Input() bookDetails: any; // receive book details from parent component
  @Output() onSave = new EventEmitter<any>();

  tempBookDetails: any;
  authors: any[] = [];
  categories: any[] = [];

  constructor(
    private authorService: AuthorService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    // Create book details copy to edit
    this.tempBookDetails = { ...this.bookDetails };
    // load Authors and Categories
    this.loadAuthors();
    this.loadCategories();
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
      title: this.tempBookDetails.title,
      description: this.tempBookDetails.description,
      publishedYear: this.tempBookDetails.publishedYear,
      authorId: this.tempBookDetails.author,
      categoryId: this.tempBookDetails.category,
    };

    // emit updated data to parent component
    this.onSave.emit(updatedFields);
  }
}
