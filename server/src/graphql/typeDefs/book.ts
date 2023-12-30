import gql from "graphql-tag";

const typeDefs = gql`
  scalar Date

  type Book {
    id: String
    name: String
    createdAt: Date
    updatedAt: Date
    userId: String
    user: User
    clubId: String
    club: Club
  }

  type BookData {
    id: String
    name: String
    author: String
    whoChose: String
    whoRead: [String]
    clubId: String
  }

  type Query {
    getBooks(clubId: String): [BookData]
  }

  type Mutation {
    createBook(bookName: String, author: String, whoChose: String, clubId: String): CreateBookResponse
  }

  type CreateBookResponse {
    success: Boolean
    error: String
  }
`;

export default typeDefs;
