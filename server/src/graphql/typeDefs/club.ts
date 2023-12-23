import gql from "graphql-tag";

const typeDefs = gql`
  type Mutation {
    createClub(membersIds: [String]): CreateClubResponse
  }

  type CreateClubResponse {
    clubId: String
  }
`;

export default typeDefs;
