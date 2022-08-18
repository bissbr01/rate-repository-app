import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../graphql/mutations";
import useSignIn from "./useSignIn";

const useSignUp = () => {
  const [createUser, result] = useMutation(SIGN_UP);
  const [signIn] = useSignIn();

  const signUp = async ({ username, password }) => {
    try {
      // create new user
      const { data } = await createUser({
        variables: { user: { username, password } },
      });
      console.log("sign up result: ", data.createUser);

      // sign in new user
      await signIn({ username: data.createUser.username, password });
      return data.createUser;
    } catch (error) {
      console.warn("Sign up error: ", error);
    }
  };

  return [signUp, result];
};

export default useSignUp;
