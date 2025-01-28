export interface Category {
  id: number;
  name: string;
  createdAt: string; // ISO Date format as string
  updatedAt: string; // ISO Date format as string
}

export interface CategoryMin {
  id: number;
  name: string;
}
