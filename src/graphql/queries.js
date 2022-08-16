import { gql } from "@apollo/client";
import { REPO_FIELDS_COMPLETE } from "./fragments";

export const GET_REPOSITORIES = gql`
  ${REPO_FIELDS_COMPLETE}
  query {
    repositories {
      totalCount
      edges {
        node {
          ...RepoFieldsComplete
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  ${REPO_FIELDS_COMPLETE}
  query Query($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepoFieldsComplete
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
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
