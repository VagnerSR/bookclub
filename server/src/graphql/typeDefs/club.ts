import gql from "graphql-tag";

const typeDefs = gql`
  scalar Date

  type Mutation {
    createClub(membersIds: [String]): CreateClubResponse
  }

  type CreateClubResponse {
    clubId: String
  }

  type Member {
    id: String
    user: User
    image: String
    haveRead: Boolean
  }

  type Book {
    id: String
    name: String
    userId: String
    clubId: String
  }

  type Club {
    id: String
    members: [Member]
    adminId: String
    createdAt: Date
    updatedAt: Date
    books: [Book]
  }

  type Query {
    clubs: [Club]
    clubById(clubId: [String]): Club
  }
`;

export default typeDefs;
