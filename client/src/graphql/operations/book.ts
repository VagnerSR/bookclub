/* eslint-disable import/no-anonymous-default-export */

import { gql } from "@apollo/client";

export default {
  Queries: {
    getBooks: gql`
      query GetBooks {
        getBooks {
          name
          id
          clubId
          whoChose
          author
        }
      }
    `,
  },
  Mutations: {
    createBook: gql`
      mutation CreateBook(
        $bookName: String!
        $author: String!
        $whoChose: String!
        $clubId: String!
      ) {
        createBook(
          bookName: $bookName
          author: $author
          whoChose: $whoChose
          clubId: $clubId
        ) {
          success
          error
        }
      }
    `,
  },
};
