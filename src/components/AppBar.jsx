import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";
import Text from "./Text";
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";
import useSignOut from "../hooks/useSignOut";

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    paddingTop: 10,
    paddingBottom: 10,
    opacity: 0.75,
    backgroundColor: "black",
    display: "flex",
    flexDirection: "row",
  },
  navItem: {
    paddingHorizontal: 10,
  },
});

const AppBar = () => {
  const { loading, error, data } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
    // Other options
  });
  const signOut = useSignOut();

  const handleSignOut = async () => {
    await signOut();
  };

  if (loading) return <Text>loading...</Text>;
  if (error) return <Text>Error! : {error}</Text>;
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable style={styles.navItem}>
          <Link to="/">
            <Text color="white" fontSize="subheading" fontWeight="bold">
              Repositories
            </Text>
          </Link>
        </Pressable>
        {data.me ? (
          <>
            <Pressable style={styles.navItem}>
              <Link to="/review">
                <Text color="white" fontSize="subheading" fontWeight="bold">
                  Create A Review
                </Text>
              </Link>
            </Pressable>
            <Pressable style={styles.navItem}>
              <Link to="/myReviews">
                <Text color="white" fontSize="subheading" fontWeight="bold">
                  My Reviews
                </Text>
              </Link>
            </Pressable>
            <Pressable style={styles.navItem} onPress={handleSignOut}>
              <Text color="white" fontSize="subheading" fontWeight="bold">
                Sign Out
              </Text>
            </Pressable>
          </>
        ) : (
          <>
            <Pressable style={styles.navItem}>
              <Link to="/signin">
                <Text color="white" fontSize="subheading" fontWeight="bold">
                  Sign In
                </Text>
              </Link>
            </Pressable>
            <Pressable style={styles.navItem}>
              <Link to="/signup">
                <Text color="white" fontSize="subheading" fontWeight="bold">
                  Sign Up
                </Text>
              </Link>
            </Pressable>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
