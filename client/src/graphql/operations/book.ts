/* eslint-disable import/no-anonymous-default-export */

import { gql } from "@apollo/client";

export default {
  Queries: {
    getBooks: gql`
      query GetBooks {
        getBooks {
          id
          name
          author
          bookImage
          whoChose
          clubId
          selectedBook
        }
      }
    `,
  },
  Mutations: {
    createBook: gql`
      mutation CreateBook(
        $bookName: String!
        $author: String!
        $bookImage: String
        $whoChose: String!
        $clubId: String!
      ) {
        createBook(
          bookName: $bookName
          author: $author
          bookImage: $bookImage
          whoChose: $whoChose
          clubId: $clubId
        ) {
          success
          error
        }
      }
    `,
    selectBook: gql`
      mutation SelectBook($bookId: String!) {
        selectBook(bookId: $bookId) {
          success
          error
        }
      }
    `,
    unselectBook: gql`
      mutation UnselectBook($bookId: String!) {
        unselectBook(bookId: $bookId) {
          success
          error
        }
      }
    `,
    deleteBook: gql`
      mutation DeleteBook($bookId: String!) {
        deleteBook(bookId: $bookId) {
          success
          error
        }
      }
    `,
    markAsRead: gql`
      mutation MarkAsRead($bookId: String!) {
        markAsRead(bookId: $bookId) {
          success
          error
        }
      }
    `,
  },
};
