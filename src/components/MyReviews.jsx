import { useMutation, useQuery } from "@apollo/client";
import { Alert, FlatList, Pressable, StyleSheet, View } from "react-native";
import { Link } from "react-router-native";
import { DELETE_REVIEW } from "../graphql/mutations";
import { MY_REVIEWS } from "../graphql/queries";
import theme from "../theme";
import { ItemSeparator } from "./RepositoryList";
import ReviewItem from "./ReviewItem";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  buttonMain: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    color: "white",
  },
  buttonAlert: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.textError,
    color: "white",
  },
});

const MyReviews = () => {
  const { data, loading, error } = useQuery(MY_REVIEWS);
  const [deleteReview, result] = useMutation(DELETE_REVIEW, {
    refetchQueries: [{ query: MY_REVIEWS }],
  });

  if (loading) return <Text>loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  const reviewNodes = data
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  const alertDelete = (id) =>
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          // onPress: () => ,
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () =>
            await deleteReview({ variables: { deleteReviewId: id } }),
        },
      ],
      {
        cancelable: true,
      }
    );

  return (
    <FlatList
      // ListHeaderComponent={this.renderHeader}
      data={reviewNodes}
      renderItem={({ item }) => (
        <>
          <ReviewItem review={item} />
          <View style={styles.container}>
            <Pressable style={styles.buttonMain}>
              <Link to={`/repositories/${item.repository.id}`}>
                <Text color="white" textAlign="center">
                  View Repository
                </Text>
              </Link>
            </Pressable>
            <Pressable
              style={styles.buttonAlert}
              onPress={() => alertDelete(item.id)}
            >
              <Text color="white" textAlign="center">
                Delete Review
              </Text>
            </Pressable>
          </View>
        </>
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
