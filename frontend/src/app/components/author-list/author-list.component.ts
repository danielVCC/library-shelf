import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorCardComponent } from '../author-card/author-card.component';
import { AuthorMin } from '../../types/author.model';

@Component({
  selector: 'app-author-list',
  imports: [AuthorCardComponent, CommonModule],
  templateUrl: './author-list.component.html',
  styleUrl: './author-list.component.css',
})
export class AuthorListComponent {
  @Input() authors: AuthorMin[] = [];
}
