import { Pressable, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import { useNavigate } from "react-router-native";
import * as Yup from "yup";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import theme from "../theme";
import useSignUp from "../hooks/useSignUp";

export const SignUpContainer = ({ signUp, navigate }) => {
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
        confirmPassword: "",
      }}
      validationSchema={Yup.object({
        username: Yup.string()
          .min(5, "Must be at least 5 characters")
          .max(30, "Must be 30 characters or less")
          .required("Username is required"),
        password: Yup.string()
          .min(8, "Must have at least 8 characters")
          .max(50, "Must be less than 50 characters")
          .required("Password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords do not match")
          .required("Password confirm is required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        const { username, password } = values;
        try {
          await signUp({ username, password });
          setSubmitting(false);
          navigate("/");
        } catch (e) {
          console.error("We couldn't sign you up: ", e);
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
          <FormikTextInput
            name="confirmPassword"
            placeholder="Confirm password"
            secureTextEntry
          />
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text color="white" textAlign="center">
              Sign Up
            </Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const navigate = useNavigate();

  return <SignUpContainer signUp={signUp} navigate={navigate} />;
};

export default SignUp;
