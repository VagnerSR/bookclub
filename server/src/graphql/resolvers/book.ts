import { GraphQLError } from "graphql";
import {
  GraphQLContext,
  ReturnResponse,
} from "../../interfaces/GraphQLContext";
import { Book } from "@prisma/client";

const resolvers = {
  Query: {
    getBooks: async (
      _: any,
      args: { clubId: string },
      context: GraphQLContext
    ): Promise<Array<Book>> => {
      const { session, prisma } = context;
      const { clubId } = args;

      if (!session?.user) {
        throw new GraphQLError("Not authorized!");
      }
      const { user } = session;

      try {
        const books = await prisma.book.findMany({
          where: {
            clubId: clubId,
          },
        });

        return books;
      } catch (error: any) {
        console.log(error);
        throw new GraphQLError(error?.message);
      }
    },
  },
  Mutation: {
    createBook: async (
      _: any,
      args: {
        bookName: string;
        author: string;
        bookImage: string | null;
        whoChose: string;
        clubId: string;
      },
      context: GraphQLContext
    ): Promise<ReturnResponse> => {
      const { bookName, author, bookImage, whoChose, clubId } = args;
      const { session, prisma } = context;

      if (!session?.user) {
        throw new GraphQLError("Not authorized!");
      }

      try {
        const book = await prisma.book.create({
          data: {
            name: bookName,
            author: author,
            bookImage: bookImage,
            whoChose: whoChose,
            clubId: clubId,
            selectedBook: false,
          },
        });

        return { success: true };
      } catch (error: any) {
        console.log(error);
        throw new GraphQLError("Error creating a book", error);
      }
    },
    selectBook: async (
      _: any,
      args: { bookId: string },
      context: GraphQLContext
    ): Promise<ReturnResponse> => {
      const { bookId } = args;
      const { session, prisma } = context;

      if (!session?.user) {
        throw new GraphQLError("Not authorized!");
      }

      try {
        const book = await prisma.book.update({
          where: {
            id: bookId,
          },
          data: {
            selectedBook: true,
          },
        });

        return { success: true };
      } catch (error: any) {
        console.log(error);
        throw new GraphQLError("Error selecting a book", error);
      }
    },
    unselectBook: async (
      _: any,
      args: { bookId: string },
      context: GraphQLContext
    ): Promise<ReturnResponse> => {
      const { bookId } = args;
      const { session, prisma } = context;

      if (!session?.user) {
        throw new GraphQLError("Not authorized!");
      }

      try {
        const book = await prisma.book.update({
          where: {
            id: bookId,
          },
          data: {
            selectedBook: false,
          },
        });

        return { success: true };
      } catch (error: any) {
        console.log(error);
        throw new GraphQLError("Error unselecting a book", error);
      }
    },
    deleteBook: async (
      _: any,
      args: { bookId: string },
      context: GraphQLContext
    ): Promise<ReturnResponse> => {
      const { bookId } = args;
      const { session, prisma } = context;

      if (!session?.user) {
        throw new GraphQLError("Not authorized!");
      }

      try {
        const book = await prisma.book.delete({
          where: {
            id: bookId,
          },
        });

        return { success: true };
      } catch (error: any) {
        console.log(error);
        throw new GraphQLError("Error deleting a book", error);
      }
    },
    markAsRead: async (
      _: any,
      args: { bookId: string },
      context: GraphQLContext
    ): Promise<ReturnResponse> => {
      const { bookId } = args;
      const { session, prisma } = context;
      const username = session?.user.username;

      if (!session?.user) {
        throw new GraphQLError("Not authorized!");
      }

      try {
        const book = await prisma.book.findUnique({
          where: {
            id: bookId,
          },
        });
        const whoRead = book?.whoRead || [];

        if (username) {
          await prisma.book.update({
            where: {
              id: bookId,
            },
            data: {
              whoRead: [...whoRead, username],
            },
          });
        }
        return { success: true };
      } catch (error: any) {
        console.log(error);
        throw new GraphQLError("Error deleting a book", error);
      }
    },
  },
};

export default resolvers;
