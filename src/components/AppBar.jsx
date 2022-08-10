import { View, StyleSheet, Pressable } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    paddingTop: 10,
    paddingBottom: 10,
    opacity: 0.75,
    backgroundColor: "black",
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable>
        <Text color="white" fontSize="subheading">
          Repositories
        </Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
