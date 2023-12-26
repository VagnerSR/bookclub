import { Prisma } from "@prisma/client";
import { clubPopulated } from "../graphql/resolvers/club";

export type ClubPopulated = Prisma.ClubGetPayload<{
  include: typeof clubPopulated;
}>;
