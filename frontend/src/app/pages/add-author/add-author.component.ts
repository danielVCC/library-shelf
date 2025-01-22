import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Author } from '../../types/author.model';
import { AuthorService } from '../../services/author/author.service';

@Component({
  selector: 'app-add-author',
  imports: [ReactiveFormsModule],
  templateUrl: './add-author.component.html',
  styleUrl: './add-author.component.css',
})
export class AddAuthorComponent implements OnInit {
  authorForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authorService: AuthorService
  ) {}

  ngOnInit(): void {
    // init form
    this.authorForm = this.fb.group({
      name: ['', Validators.required],
      bio: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.authorForm.valid) {
      const authorData = this.authorForm.value;

      // Post author with data from authorData
      this.authorService.createAuthor(authorData).subscribe({
        next: (response) => {
          console.log('author created:', response);
          this.router.navigate(['/authors']); // redirect to authors page
        },
        error: (error) => {
          console.error('Error creating author:', error);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
