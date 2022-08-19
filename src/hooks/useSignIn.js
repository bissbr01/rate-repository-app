import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import { useApolloClient } from "@apollo/client";
import useAuthStorage from "../hooks/useAuthStorage";

const useSignIn = () => {
  const [authenticate, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    try {
      const authResult = await authenticate({
        variables: { credentials: { username, password } },
      });
      await authStorage.setAccessToken(
        authResult.data.authenticate.accessToken
      );
      await apolloClient.resetStore();
    } catch (error) {
      console.warn("Sign in error: ", error);
    }
  };

  return [signIn, result];
};

export default useSignIn;
