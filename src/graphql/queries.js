import { gql } from "@apollo/client";
import { REPO_FIELDS_COMPLETE } from "./fragments";

export const GET_REPOSITORIES = gql`
  ${REPO_FIELDS_COMPLETE}
  query Query(
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderDirection: $orderDirection
      orderBy: $orderBy
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      edges {
        node {
          ...RepoFieldsComplete
        }
      }
      pageInfo {
        hasNextPage
        startCursor
        endCursor
        hasPreviousPage
      }
      totalCount
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
