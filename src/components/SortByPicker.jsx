import { Picker } from "@react-native-picker/picker";

const SortByPicker = ({ sortBy, handleSortChange }) => {
  return (
    <Picker
      selectedValue={sortBy}
      onValueChange={(itemValue) => {
        handleSortChange(itemValue);
      }}
    >
      <Picker.Item label="Most recently reviewed" value="latestReviewed" />
      <Picker.Item label="Highest rated" value="highestRated" />
      <Picker.Item label="Lowest rated" value="lowestRated" />
    </Picker>
  );
};

export default SortByPicker;
