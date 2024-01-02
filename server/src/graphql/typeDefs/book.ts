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
  }

  type Query {
    getBooks(clubId: String): [BookData]
  }

  type Mutation {
    createBook(bookName: String, author: String, bookImage: String, whoChose: String, clubId: String): CreateBookResponse
  }

  type CreateBookResponse {
    success: Boolean
    error: String
  }
`;

export default typeDefs;
