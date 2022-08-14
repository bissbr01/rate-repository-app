import { useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router-native";
import useAuthStorage from "../hooks/useAuthStorage";

const useSignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const signOut = async () => {
    try {
      await authStorage.removeAccessToken();
      await apolloClient.resetStore();
      console.log(
        "after logout and reset: ",
        await authStorage.getAccessToken()
      );
      console.log("Signed out!");
      navigate("/signin");
    } catch (error) {
      console.warn("Sign Out error: ", error);
    }
  };

  return signOut;
};

export default useSignOut;
