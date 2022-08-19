import React, { useState } from "react";
import { useNavigate } from "react-router-native";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useDebouncedCallback } from "use-debounce";
import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";
import SortByPicker from "./SortByPicker";
import Searchbar from "./SearchBar";

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
    const { repositories, navigate, onEndReached } = this.props;
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];
    return (
      <FlatList
        ListHeaderComponent={this.renderHeader}
        data={repositoryNodes}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
            <RepositoryItem repository={item} isSingle={false} />
          </Pressable>
        )}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const { data, refetch, fetchMore } = useRepositories({
    first: 8,
  });
  const [sortBy, setSortBy] = useState("latestReviewed");
  const [searchQuery, setSearchQuery] = useState();
  const navigate = useNavigate();
  const debounce = useDebouncedCallback(
    (query) => refetch({ searchKeyword: query }),
    500
  );

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
    debounce(query);
  };

  const onEndReached = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={data.repositories}
      refetch={refetch}
      navigate={navigate}
      sortBy={sortBy}
      handleSortChange={handleSortChange}
      onSearch={onSearch}
      searchQuery={searchQuery}
      onEndReached={onEndReached}
    />
  );
};

export default RepositoryList;
