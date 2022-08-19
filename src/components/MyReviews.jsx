import { useQuery } from "@apollo/client";
import { FlatList, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import { MY_REVIEWS } from "../graphql/queries";
import { ItemSeparator } from "./RepositoryList";
import ReviewItem from "./ReviewItem";
import Text from "./Text";

const MyReviews = () => {
  const { data, loading, error } = useQuery(MY_REVIEWS);
  const navigate = useNavigate();

  if (loading) return <Text>loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  const reviewNodes = data
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];
  console.log(reviewNodes);
  return (
    <FlatList
      // ListHeaderComponent={this.renderHeader}
      data={reviewNodes}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => navigate(`/repositories/${item.repository.id}`)}
        >
          <ReviewItem review={item} />
        </Pressable>
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
