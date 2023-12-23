import { GraphQLContext } from "../../interfaces/GraphQLContext";

const resolvers = {
  Mutation: {
    createClub: async (_: any, args: { membersIds: Array<string>, context: GraphQLContext}) => {
      console.log("inside club", args)
    },
  },
};

export default resolvers;
