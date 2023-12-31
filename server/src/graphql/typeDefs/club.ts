import gql from "graphql-tag";

const typeDefs = gql`
  scalar Date

  type Mutation {
    createClub(membersIds: [String], clubName: String): CreateClubResponse
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
    author: String
    bookImage: String
    whoChose: String
    whoRead: [String]
    clubId: String
    selectedBook: Boolean
  }

  type Club {
    id: String
    clubName: String
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
