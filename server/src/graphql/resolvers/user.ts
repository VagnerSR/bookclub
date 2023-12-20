import { GraphQLContext } from "../../interfaces/GraphQLContext";
import { CreateUsernameResponse } from "../../interfaces/User";

const resolvers = {
  Query: {
    searchUsers: () => {},
  },

  Mutation: {
    createUsername: async (
      _: any,
      args: { username: string },
      context: GraphQLContext
    ): Promise<CreateUsernameResponse> => {
      const { username } = args;
      const { session, prisma } = context;

      console.log(session)

      if (!session?.user) {
        return {
          error: "Not authorized!",
        };
      }

      const { id: userId } = session.user;

      try {
        const existingUser = await prisma.user.findUnique({
          where: {
            username: username,
          },
        });

        if (existingUser) {
          return {
            error: "Username already taken. Try another",
          };
        }

        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            username: username,
          },
        });

        return { success: true };
      } catch (error: any) {
        console.log("createUsername ", error);
        return {
          error: error?.message,
        };
      }
    },
  },
};

export default resolvers;
