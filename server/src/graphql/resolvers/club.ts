import { GraphQLError } from "graphql";
import { GraphQLContext } from "../../interfaces/GraphQLContext";
import { Prisma } from "@prisma/client";
import { ClubPopulated } from "../../interfaces/Club";

const resolvers = {
  Query: {
    clubs: async (
      _: any,
      __: any,
      context: GraphQLContext
    ): Promise<Array<ClubPopulated>> => {
      const { session, prisma } = context;

      if (!session?.user) {
        throw new GraphQLError("Not authorized!");
      }
      const { user } = session;

      try {
        const clubs = await prisma.club.findMany({
          // where: {
          //   members: {
          //     some: {
          //       userId: {
          //         equals: user.id,
          //       },
          //     },
          //   },
          // },
          include: clubPopulated,
        });

        return clubs.filter(
          (club) => !!club.members.find((member) => member.user.id === user.id)
        );
      } catch (error: any) {
        console.log(error);
        throw new GraphQLError(error?.message);
      }
    },
    clubById: async (
      _: any,
      args: { clubId: string },
      context: GraphQLContext
    ): Promise<any> => {
      const { clubId: searchedClubId } = args;
      const { session, prisma } = context;

      if (!session?.user) {
        throw new GraphQLError("Not authorized!");
      }

      try {
        const club = await prisma.club.findUnique({
          where: {
            id: searchedClubId,
          },
          include: clubPopulated,
        });

        return club;
      } catch (error: any) {
        console.log(error);
        throw new GraphQLError(error?.message);
      }
    },
  },
  Mutation: {
    createClub: async (
      _: any,
      args: { membersIds: Array<string> },
      context: GraphQLContext
    ): Promise<{ clubId: string }> => {
      const { membersIds } = args;
      const { session, prisma } = context;

      if (!session?.user) {
        throw new GraphQLError("Not authorized!");
      }

      const { user } = session;

      try {
        const club = await prisma.club.create({
          data: {
            members: {
              createMany: {
                data: membersIds.map((id) => ({
                  userId: id,
                  adminId: user.id,
                  haveRead: false,
                })),
              },
            },
            adminId: user.id,
          },
          include: clubPopulated,
        });

        return {
          clubId: club.id,
        };
      } catch (error: any) {
        console.log(error);
        throw new GraphQLError("Error creating a club", error?.message);
      }
    },
  },
};

export const memberPopulated = Prisma.validator<Prisma.ClubMemberInclude>()({
  user: {
    select: {
      id: true,
      username: true,
      image: true,
    },
  },
});

export const clubPopulated = Prisma.validator<Prisma.ClubInclude>()({
  members: {
    include: memberPopulated,
  },
  books: {
    select: {
      name: true,
    },
  },
});

export default resolvers;
