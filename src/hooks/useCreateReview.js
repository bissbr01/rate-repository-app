import { useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router-native";
import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
  const [submitReview, review] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const createReview = async (reviewData) => {
    const result = await submitReview({
      variables: { review: reviewData },
    });
    console.log("create review result data: ", result.data);
    navigate(`/repositories/${result.data.createReview.repositoryId}`);
  };

  return [createReview, review];
};

export default useCreateReview;
