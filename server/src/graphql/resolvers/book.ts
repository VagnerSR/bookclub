import { GraphQLError } from "graphql";
import { GraphQLContext } from "../../interfaces/GraphQLContext";
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
    ): Promise<{}> => {
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
          },
        });

        return { success: true };
      } catch (error: any) {
        console.log(error);
        throw new GraphQLError("Error creating a book", error);
      }
    },
  },
};

export default resolvers;
