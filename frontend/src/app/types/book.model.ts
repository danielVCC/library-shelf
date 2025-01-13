import { Author } from './author.model';
import { Category } from './category.model';

export interface Book {
  id: number;
  title: string;
  description: string;
  publishedYear: number;
  author: Author;
  category: Category;
  createdAt: string; // ISO Date format as string
  updatedAt: string; // ISO Date format as string
}

export interface BookUpdate {
  title: string;
  description: string;
  publishedYear: number;
  author: { id: number };
  category: { id: number };
}
