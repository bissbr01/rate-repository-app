import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const { loading, error, data, refetch, networkStatus } = useQuery(
    GET_REPOSITORIES,
    {
      notifyOnNetworkStatusChange: true,
    }
  );

  return { loading, error, data, refetch, networkStatus };
};

export default useRepositories;
