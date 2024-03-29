import gql from "graphql-tag";

const typeDefs = gql`
  scalar Date

  type BookData {
    id: String
    name: String
    bookImage: String
    author: String
    whoChose: String
    whoRead: [String]
    clubId: String
    selectedBook: Boolean
  }

  type Query {
    getBooks(clubId: String): [BookData]
  }

  type Mutation {
    createBook(bookName: String, author: String, bookImage: String, whoChose: String, clubId: String): CreateBookResponse
    selectBook(bookId: String) : CreateBookResponse
    unselectBook(bookId: String) : CreateBookResponse
    deleteBook(bookId: String) : CreateBookResponse
    markAsRead(bookId: String) : CreateBookResponse
  }

  type CreateBookResponse {
    success: Boolean
    error: String
  }
`;

export default typeDefs;
