import { FlatList } from "react-native";
import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import { ItemSeparator } from "./RepositoryList";
import Text from "./Text";
import RepositoryItem from "./RepositoryItem";
import ReviewItem from "./ReviewItem";

const SingleRepository = () => {
  const params = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: params.id },
  });

  if (loading) return <Text>loading...</Text>;
  if (error) return <Text>Error! : {error}</Text>;

  const repository = data.repository;
  const reviews = data.repository
    ? data.repository.reviews.edges.map((edge) => edge.node)
    : [];

  console.log(reviews);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryItem repository={repository} isSingle={true} />
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default SingleRepository;
