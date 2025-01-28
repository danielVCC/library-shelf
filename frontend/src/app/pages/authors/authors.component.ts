import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorListComponent } from '../../components/author-list/author-list.component';
import { AuthorMin } from '../../types/author.model';
import { AuthorService } from '../../services/author/author.service';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-authors',
  imports: [CommonModule, AuthorListComponent, LoadingSpinnerComponent],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css',
})
export class AuthorsComponent implements OnInit {
  authors: AuthorMin[] = [];
  isLoading: boolean = true;
  selectedSort: string = 'name';

  constructor(private authorService: AuthorService) {}

  ngOnInit(): void {
    this.fetchAuthors();
  }

  fetchAuthors(): void {
    this.isLoading = true;
    this.authorService.getAuthors().subscribe({
      next: (data) => {
        this.authors = data;
        this.sortAuthors(); // initial sort
        this.isLoading = false;
      },
      error: (error) => {
        console.log('Error fetching auhors: ', error);
        this.isLoading = false;
      },
    });
  }

  onSortChange(event: Event): void {
    this.selectedSort = (event.target as HTMLSelectElement).value;
    this.sortAuthors();
  }

  sortAuthors(): void {
    this.authors.sort((a, b) => {
      if (this.selectedSort === 'name') {
        return a.name.localeCompare(b.name);
      }
      // order to implement:
      else if (this.selectedSort === 'bookCount') {
        return b.bookCount - a.bookCount;
      }
      // else if (this.selectedSort === 'updatedAt') {
      //   return (
      //     new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      //   );
      // }
      return 0;
    });
  }
}
