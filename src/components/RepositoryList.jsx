import { FlatList, View, StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";
import { useNavigate } from "react-router-native";
import SortByPicker from "./SortByPicker";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  navigate,
  refetch,
}) => {
  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ListHeaderComponent={() => <SortByPicker refetch={refetch} />}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
          <RepositoryItem repository={item} isSingle={false} />
        </Pressable>
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

const RepositoryList = () => {
  const { data, loading, error, refetch } = useRepositories();
  const navigate = useNavigate();

  if (loading) return <Text>loading...</Text>;
  if (error) return <Text>Error! : {error}</Text>;

  return (
    <RepositoryListContainer
      repositories={data.repositories}
      refetch={refetch}
      navigate={navigate}
    />
  );
};

export default RepositoryList;
