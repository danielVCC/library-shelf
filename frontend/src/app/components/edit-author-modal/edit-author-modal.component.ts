import { Component, EventEmitter } from '@angular/core';
import { Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { Author, AuthorUpdate } from '../../types/author.model';

@Component({
  selector: 'app-edit-author-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-author-modal.component.html',
  styleUrl: './edit-author-modal.component.css',
})
export class EditAuthorModalComponent {
  @Input() authorDetails?: Author; // receive author details from parent component
  @Output() onSave = new EventEmitter<any>();

  editForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      name: [''],
      bio: [''],
    });
  }

  ngOnChanges(): void {
    if (this.authorDetails) {
      this.editForm.patchValue({
        name: this.authorDetails.name,
        bio: this.authorDetails.bio,
      });
    }
  }

  saveChanges(): void {
    const updatedFields: AuthorUpdate = {
      name: this.editForm.get('name')?.value,
      bio: this.editForm.get('bio')?.value,
    };

    // emit updated data to parent component
    this.onSave.emit(updatedFields);
  }
}
