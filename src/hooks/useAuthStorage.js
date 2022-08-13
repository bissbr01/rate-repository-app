import { useContext } from "react";
import AuthStorageContext from "../contexts/AuthStorageContext";

const useAuthStorage = () => {
  if (AuthStorageContext === undefined) {
    throw new Error("useAuthStorage must be used within a AuthStorageProvider");
  }

  return useContext(AuthStorageContext);
};

export default useAuthStorage;
