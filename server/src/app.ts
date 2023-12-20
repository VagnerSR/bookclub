import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import { createServer } from "http";
import { getSession } from "next-auth/react";
import * as dotenv from "dotenv";
import cors from "cors";
import { json } from "body-parser";
import http from "http";
import typeDefs from "./graphql/typeDefs/typeDefs";
import resolvers from "./graphql/resolvers/resolvers";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { GraphQLContext } from "./interfaces/GraphQLContext";
import { PrismaClient } from "@prisma/client";
import { Session } from "./interfaces/User";

dotenv.config();

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
  };

  const prisma = new PrismaClient();

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    context: async ({ req }): Promise<GraphQLContext> => {
      const session = await getSession({ req });

      return { session: session as Session, prisma }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  server.applyMiddleware({ app, cors: corsOptions })

  await new Promise<void>((resolve) => httpServer.listen({ port: 8080 }, resolve));
  console.log(`🚀 Server ready at http://localhost:8080/graphql`);
}

startApolloServer().catch((err) => console.log(err));
