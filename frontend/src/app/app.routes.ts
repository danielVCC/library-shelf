import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BooksComponent } from './pages/books/books.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { AddBookComponent } from './pages/add-book/add-book.component';
import { AuthorsComponent } from './pages/authors/authors.component';
import { AuthorDetailComponent } from './pages/author-detail/author-detail.component';
import { AddAuthorComponent } from './pages/add-author/add-author.component';
// import { AboutComponent } from './pages/about/about.component';
// import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // HomePage
  { path: 'books', component: BooksComponent }, // Book catalog
  { path: 'books/:id', component: BookDetailComponent },
  { path: 'add-book', component: AddBookComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'authors/:id', component: AuthorDetailComponent },
  { path: 'add-author', component: AddAuthorComponent },
  //   { path: 'about', component: AboutComponent },
  //   { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' }, // If route does not exist, redirect to home
];
