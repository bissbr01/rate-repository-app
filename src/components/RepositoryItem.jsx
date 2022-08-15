import { View, StyleSheet, Image } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "white",
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 5,
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  flexColumn: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  flexItem: {
    flex: 1,
  },
  cardHeading: {
    flex: 3,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
  },
  primaryBackground: {
    alignSelf: "flex-start",
    padding: 5,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    color: "white",
  },
  spacer: {
    paddingTop: 10,
  },
});

export const roundToThousands = (number) => {
  if (number >= 1000) {
    // parsing as Number() removes trailing zero after decimal.
    const rounded = Number((Math.round(number) / 1000).toFixed(1));
    return `${rounded}k`;
  } else {
    return `${number}`;
  }
};

function RepositoryItem({ repository }) {
  const {
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
  } = repository;

  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.flexRow}>
        <View style={styles.flexItem}>
          <Image style={styles.avatar} source={{ uri: ownerAvatarUrl }} />
        </View>
        <View style={styles.cardHeading}>
          <Text fontWeight="bold" fontSize="subheading">
            {fullName}
          </Text>
          <Text color="textSecondary">{description}</Text>
          <View>
            <Text style={styles.primaryBackground}>{language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.spacer}></View>
      <View style={styles.flexRow}>
        <View style={styles.flexColumn}>
          <Text fontWeight="bold">{roundToThousands(stargazersCount)}</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.flexColumn}>
          <Text fontWeight="bold">{roundToThousands(forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.flexColumn}>
          <Text fontWeight="bold">{roundToThousands(reviewCount)}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.flexColumn}>
          <Text fontWeight="bold">{roundToThousands(ratingAverage)}</Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  );
}

export default RepositoryItem;
