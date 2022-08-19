import { gql } from "@apollo/client";

export const REPO_FIELDS_COMPLETE = gql`
  fragment RepoFieldsComplete on Repository {
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
    userHasReviewed
    openIssuesCount
  }
`;
