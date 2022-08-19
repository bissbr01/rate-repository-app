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
          reviews {
            totalCount
          }
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
  query Query($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      ...RepoFieldsComplete
      reviews(first: $first, after: $after) {
        totalCount
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
            id
            userId
            rating
            createdAt
            text
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

export const MY_REVIEWS = gql`
  query Query($first: Int, $after: String) {
    me {
      id
      username
      createdAt
      reviewCount
      reviews(first: $first, after: $after) {
        totalCount
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
            id
            userId
            repositoryId
            rating
            createdAt
            text
            repository {
              id
              fullName
              name
              ownerName
              ownerAvatarUrl
            }
            user {
              username
              id
            }
          }
        }
      }
    }
  }
`;
