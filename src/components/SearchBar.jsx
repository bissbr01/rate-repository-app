import { StyleSheet } from "react-native";
import { Searchbar as PaperSearchbar } from "react-native-paper";

const styles = StyleSheet.create({
  searchbar: {
    marginTop: 15,
  },
});

const Searchbar = ({ onSearch, searchQuery }) => {
  const handleSearchQuery = (query) => {
    onSearch(query);
  };

  return (
    <PaperSearchbar
      style={styles.searchbar}
      placeholder="Search"
      onChangeText={(query) => handleSearchQuery(query)}
      value={searchQuery}
    />
  );
};

export default Searchbar;
