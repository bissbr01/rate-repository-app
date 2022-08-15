/* eslint-disable jest/expect-expect */
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { SignInContainer } from "../../components/SignIn";
// ...

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const onSubmit = jest.fn();
      const { getByPlaceholderText, getByText } = render(
        <SignInContainer signIn={onSubmit} />
      );
      const usernameInput = getByPlaceholderText("username");
      const passwordInput = getByPlaceholderText("password");
      const submitButton = getByText("Sign In");

      fireEvent.changeText(usernameInput, "kalle");
      fireEvent.changeText(passwordInput, "password");
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toBeCalledWith({
          username: "kalle",
          password: "password",
        });
      });
    });
  });
});
