import { Pressable } from "react-native";
import { View } from "react-native-web";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";

const SignIn = () => {
  const onSubmit = (data) => {
    console.log(data);
    data.forEach((element) => {
      console.log(element);
    });
  };

  return (
    <View>
      <FormikTextInput name="username" placeholder="username..." />
      <FormikTextInput
        name="password"
        placeholder="password..."
        secureTextEntry
      />
      <Pressable onPress={onSubmit}>
        <Text>Submit</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
