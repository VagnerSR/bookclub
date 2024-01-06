import { PrismaClient } from "@prisma/client";
import { Session } from "./User";

export interface GraphQLContext {
  session: Session | null;
  prisma: PrismaClient;
}


export interface ReturnResponse {
  success?: boolean;
  error?: string;
}
