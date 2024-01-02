/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";

export default {
  Queries: {
    clubs: gql`
      query Clubs {
        clubs {
          id
          clubName
          members {
            user {
              id
              username
              image
            }
            haveRead
          }
          adminId
          books {
            name
          }
          updatedAt
          createdAt
        }
      }
    `,
    clubById: gql`
      query ClubById {
        clubs {
          id
          clubName
          members {
            user {
              id
              username
              image
            }
            haveRead
          }
          adminId
          books {
            name
          }
          updatedAt
          createdAt
        }
      }
    `,
  },
  Mutations: {
    createClub: gql`
      mutation CreateClub($membersIds: [String]!, $clubName: String!) {
        createClub(membersIds: $membersIds, clubName: $clubName) {
          clubId
        }
      }
    `,
  },
};
