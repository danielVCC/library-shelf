import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-delete-modal',
  imports: [CommonModule],
  templateUrl: './confirm-delete-modal.component.html',
  styleUrl: './confirm-delete-modal.component.css',
})
export class ConfirmDeleteModalComponent {
  @Input() itemType: string = ''; // (Book, Author, Category)
  @Input() itemName?: string;
  @Output() onConfirm = new EventEmitter<void>(); // emit event confirm deletion

  confirmDelete(): void {
    this.onConfirm.emit();
  }
}
