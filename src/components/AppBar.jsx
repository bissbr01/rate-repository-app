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
    paddingHorizontal: 15,
  },
});

const AppBar = () => {
  const me = useQuery(ME);
  const signOut = useSignOut();

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
        {me ? (
          <Pressable style={styles.navItem}>
            <Link to="/signin">
              <Text color="white" fontSize="subheading" fontWeight="bold">
                Sign In
              </Text>
            </Link>
          </Pressable>
        ) : (
          <Pressable onPress={signOut}>
            <Link to="/signin">
              <Text color="white" fontSize="subheading" fontWeight="bold">
                Sign Out
              </Text>
            </Link>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
