export interface Book {
  id: string;
  name: string;
  author: string;
  bookImage: string;
  whoChose: string;
  clubId: string;
  whoRead: string[];
  selectedBook: boolean;
}

export interface BookData {
  getBooks: Array<Book>
}


export interface CreateBookData {
  createBook: {
    success: boolean;
    error: string;
  };
}

export interface SelectBookData {
  selectBook: {
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

export interface BookOperationsVariables {
  bookId: string;
}
