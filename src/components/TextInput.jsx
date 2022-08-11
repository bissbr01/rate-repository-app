import { TextInput as NativeTextInput, StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  textInput: {
    padding: 5,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.textSecondary,
  },
  error: {
    borderWidth: 1,
    borderColor: theme.colors.textError,
  },
});

// eslint-disable-next-line no-unused-vars
const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style, error && styles.error];

  return (
    <NativeTextInput style={[styles.textInput, textInputStyle]} {...props} />
  );
};

export default TextInput;
