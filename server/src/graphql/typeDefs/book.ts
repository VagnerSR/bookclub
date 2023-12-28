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

  type SearchedBook {
    id: String
    name: String
    userId: String
    clubId: String
  }

  type Query {
    getBooks(clubId: String): [SearchedBook]
  }

  type Mutation {
    createBook(bookName: String, clubId: String): CreateBookResponse
  }

  type CreateBookResponse {
    success: Boolean
    error: String
  }
`;

export default typeDefs;
