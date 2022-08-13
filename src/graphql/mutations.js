import { gql } from "@apollo/client";

export const AUTHENTICATE = gql`
  mutation Mutation($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      user {
        id
        username
      }
      accessToken
      expiresAt
    }
  }
`;
