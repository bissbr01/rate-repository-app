import { Searchbar as PaperSearchbar } from "react-native-paper";

const Searchbar = ({ onSearch, searchQuery }) => {
  const handleSearchQuery = (query) => {
    onSearch(query);
  };

  return (
    <PaperSearchbar
      placeholder="Search"
      onChangeText={(query) => handleSearchQuery(query)}
      value={searchQuery}
    />
  );
};

export default Searchbar;
