import { Pressable, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import { useNavigate } from "react-router-native";
import * as Yup from "yup";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import theme from "../theme";
import useSignIn from "../hooks/useSignIn";

const SignIn = () => {
  const [signIn, result] = useSignIn();
  const navigate = useNavigate();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
    },
    button: {
      backgroundColor: theme.colors.primary,
      padding: 10,
      margin: 10,
      borderRadius: 5,
    },
  });

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={Yup.object({
        username: Yup.string()
          .min(5, "Must be at least 5 characters")
          .max(15, "Must be 15 characters or less")
          .required("Username is required"),
        password: Yup.string()
          .min(8, "Must have at least 8 characters")
          .required("Password is required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        const { username, password } = values;
        try {
          await signIn({ username, password });
          setSubmitting(false);
          navigate("/");
        } catch (e) {
          console.warn("We couldn't sign in: ", e);
        }
      }}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput name="username" placeholder="username" />
          <FormikTextInput
            name="password"
            placeholder="password"
            secureTextEntry
          />
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text color="white" textAlign="center">
              Sign In
            </Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignIn;
