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
  const { repositories, loading, error } = useRepositories();

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  if (loading) return <Text>loading...</Text>;
  if (error) return <Text>Error! : {error}</Text>;

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default RepositoryList;
