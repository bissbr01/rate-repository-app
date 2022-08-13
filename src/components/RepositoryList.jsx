import { FlatList, View, StyleSheet } from "react-native";
import Text from "./Text";
import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { data, loading, error } = useRepositories();

  if (loading) return <Text>loading...</Text>;
  if (error) return <Text>Error! : {error}</Text>;

  // Get the nodes from the edges array
  const repositoryNodes = data.repositories
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default RepositoryList;
