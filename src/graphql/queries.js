import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      totalCount
      edges {
        node {
          reviews {
            totalCount
          }
          ratingAverage
          reviewCount
          stargazersCount
          watchersCount
          url
          ownerAvatarUrl
          description
          language
          fullName
          id
        }
      }
    }
  }
`;

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`;
