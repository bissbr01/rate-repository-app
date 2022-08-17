import { Pressable, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import theme from "../theme";
import useCreateReview from "../hooks/useCreateReview";

const CreateReview = () => {
  const [createReview, review] = useCreateReview();
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
        ownerName: "",
        repositoryName: "",
        rating: "",
        text: "",
      }}
      validationSchema={Yup.object({
        ownerName: Yup.string().required("Owner's name is required"),
        repositoryName: Yup.string().required("Repository name is required"),
        rating: Yup.number()
          .min(0, "rating must be at least 0")
          .max(100, "rating must be at most 100")
          .required(),
        text: Yup.string(),
      })}
      onSubmit={async ({ rating, ...values }, { setSubmitting }) => {
        try {
          const reviewData = {
            rating: Number(rating),
            ...values,
          };
          await createReview(reviewData);
          setSubmitting(false);
        } catch (e) {
          console.warn("We couldn't submit review: ", e);
        }
      }}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput
            name="ownerName"
            placeholder="Repository owner's name"
          />
          <FormikTextInput
            name="repositoryName"
            placeholder="Repository name"
          />
          <FormikTextInput
            name="rating"
            placeholder="rating between 0 and 100"
          />
          <FormikTextInput name="text" placeholder="review" multiline />
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text color="white" textAlign="center">
              Create Review
            </Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default CreateReview;
