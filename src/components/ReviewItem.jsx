import { View, StyleSheet } from "react-native";
import { format } from "date-fns";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
  },
  ratingCol: {
    flex: 1,
    display: "flex",
  },
  ratingItem: {
    justifyContent: "center",
    alignContent: "center",
    height: 50,
    width: 50,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 25,
  },
  ratingText: {
    textAlign: "center",
    color: theme.colors.primary,
  },
  reviewCol: {
    flex: 4,
    display: "flex",
    flexDirection: "column",
  },
  reviewItem: {
    flex: 1,
    paddingTop: 5,
  },
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.ratingCol}>
        <View style={styles.ratingItem}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
      </View>
      <View style={styles.reviewCol}>
        <View style={styles.reviewItem}>
          <Text fontSize="subheading" fontWeight="bold">
            {review.user.username}
          </Text>
        </View>
        <View style={styles.reviewItem}>
          <Text color="textSecondary">
            {format(new Date(review.createdAt), "MMM dd, yyyy")}
          </Text>
        </View>
        <View style={styles.reviewItem}>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;
