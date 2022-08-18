import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { NetworkStatus } from "@apollo/client";
import Text from "./Text";
import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";
import { useNavigate } from "react-router-native";
import SortByPicker from "./SortByPicker";
import React, { useState } from "react";
import Searchbar from "./SearchBar";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { onSearch, searchQuery, sortBy, handleSortChange } = this.props;
    return (
      <>
        <Searchbar onSearch={onSearch} searchQuery={searchQuery} />
        <SortByPicker sortBy={sortBy} handleSortChange={handleSortChange} />
      </>
    );
  };
  // Get the nodes from the edges array
  render() {
    const { repositories, navigate } = this.props;
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];
    return (
      <FlatList
        data={repositoryNodes}
        ListHeaderComponent={this.renderHeader}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
            <RepositoryItem repository={item} isSingle={false} />
          </Pressable>
        )}
        ItemSeparatorComponent={ItemSeparator}
      />
    );
  }
}

const RepositoryList = () => {
  const { data, loading, error, refetch, networkStatus } = useRepositories();
  const [sortBy, setSortBy] = useState("latestReviewed");
  const [searchQuery, setSearchQuery] = useState();
  const [debouncedQuery] = useDebounce(searchQuery, 1000);
  const navigate = useNavigate();

  const handleSortChange = async (itemValue) => {
    setSortBy(itemValue);
    const variables = {};
    switch (itemValue) {
      case "latestReviewed":
        variables.orderBy = "CREATED_AT";
        variables.orderDirection = "DESC";
        break;
      case "highestRated":
        variables.orderBy = "RATING_AVERAGE";
        variables.orderDirection = "DESC";
        break;
      case "lowestRated":
        variables.orderBy = "RATING_AVERAGE";
        variables.orderDirection = "ASC";
        break;
      default:
        console.warn("exhaustive switch statement error!");
        break;
    }
    refetch(variables);
  };

  const onSearch = (query) => {
    setSearchQuery(query);
    refetch({ searchKeyword: debouncedQuery });
  };

  if (networkStatus === NetworkStatus.refetch) return <Text>Refetching!</Text>;
  if (loading) return <Text>loading...</Text>;
  if (error) return <Text>Error! : {error}</Text>;

  return (
    <RepositoryListContainer
      repositories={data.repositories}
      refetch={refetch}
      navigate={navigate}
      sortBy={sortBy}
      handleSortChange={handleSortChange}
      onSearch={onSearch}
      searchQuery={searchQuery}
    />
  );
};

export default RepositoryList;
