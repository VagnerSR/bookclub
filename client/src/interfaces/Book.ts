export interface Book {
  id: string;
  name: string;
  author: string;
  bookImage: string;
  whoChose: string;
  clubId: string;
  whoRead: string[];
}

export interface BookData {
  getBooks: Array<Book>
}

export interface BookInputs {
  clubId: string;
}

export interface CreateBookData {
  createBook: {
    success: boolean;
    error: string;
  };
}

export interface CreateBookVariables {
  bookName: string;
  author: string;
  bookImage: string;
  whoChose: string;
  clubId: string;
}
