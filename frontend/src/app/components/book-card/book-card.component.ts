import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Book } from '../../types/book.model';

@Component({
  selector: 'app-book-card',
  imports: [RouterModule],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css',
})
export class BookCardComponent {
  @Input() book!: Book; // receive book info
}
