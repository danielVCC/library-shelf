export interface Author {
  id: number;
  name: string;
  bio: string;
  createdAt: string; // ISO Date format as string
  updatedAt: string; // ISO Date format as string
}

export interface AuthorMin {
  id: number;
  name: string;
  bio: string;
  bookCount: number;
}

export interface AuthorUpdate {
  name: string;
  bio: string;
}
