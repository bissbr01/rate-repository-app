import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import { useApolloClient } from "@apollo/client";
import useAuthStorage from "../hooks/useAuthStorage";

const useSignIn = () => {
  const [authenticate, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const authResult = await authenticate({
      variables: { credentials: { username, password } },
    });
    console.log("sign in result", authResult.data.authenticate.accessToken);
    await authStorage.setAccessToken(authResult.data.authenticate.accessToken);
    apolloClient.resetStore();
  };

  return [signIn, result];
};

export default useSignIn;
