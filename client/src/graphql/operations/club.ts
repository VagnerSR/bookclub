/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";

export default {
  Queries: {},
  Mutations: {
    createClub: gql`
     mutation CreateClub($membersIds: [String]!) {
      createClub(membersIds: $membersIds ) {
        clubId
      }
     }
    `,
  },
};
