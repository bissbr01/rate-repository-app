import { useState } from "react";
import { Picker } from "@react-native-picker/picker";

const SortByPicker = ({ refetch }) => {
  const [sortBy, setSortBy] = useState("latestReviewed");

  const handleChange = (itemValue) => {
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
    console.log("variables in switch", variables);
    refetch(variables);
  };

  return (
    <Picker
      selectedValue={sortBy}
      onValueChange={(itemValue) => {
        setSortBy(itemValue);
        handleChange(itemValue);
      }}
    >
      <Picker.Item label="Most recently reviewed" value="latestReviewed" />
      <Picker.Item label="Highest rated" value="highestRated" />
      <Picker.Item label="Lowest rated" value="lowestRated" />
    </Picker>
  );
};

export default SortByPicker;
