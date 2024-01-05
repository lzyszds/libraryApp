export interface Book {
  book_id?: number;
  book_name: string;
  author: string;
  cover: string;
  introduction: string;
  publisher: string;
  publish_date: string;
  isbn: string;
  category_name?: string;
  category_id?: number;
  is_borrowable: number;
  copies_number?: number
}

export interface BookCountData {
  count: number;
  data: Book[];
}
