/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";

export default {
  Queries: {
    clubs: gql`
      query Clubs {
        clubs {
          id
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
      mutation CreateClub($membersIds: [String]!) {
        createClub(membersIds: $membersIds) {
          clubId
        }
      }
    `,
  },
};
