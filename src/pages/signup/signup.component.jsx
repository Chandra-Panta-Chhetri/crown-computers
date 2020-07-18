import React from "react";
import {
  SignUpContainer,
  FormContainer,
  Form,
  FormTitle,
  ErrorText,
  FormButton,
  FormRedirectLink
} from "./signup.styles";

import FormInput from "../../components/form-input/form-input.component";

import { addUserToDb, auth } from "../../utils/firebaseConfig";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      errorMessage: ""
    };
  }

  createNewUser = async (e) => {
    e.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    try {
      if (password !== confirmPassword) {
        return this.setState({
          errorMessage: "Passwords must match"
        });
      }
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await addUserToDb(user, { displayName });
    } catch (e) {
      this.setState({
        errorMessage: e.message,
        displayName: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
    }
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <SignUpContainer>
        <FormContainer>
          <FormTitle>SIGN UP</FormTitle>
          <ErrorText>{this.state.errorMessage}</ErrorText>
          <Form onSubmit={this.createNewUser}>
            <FormInput
              type={"text"}
              name={"displayName"}
              label={"Full Name"}
              value={this.state.displayName}
              handler={this.handleChange}
              required
            />
            <FormInput
              type={"email"}
              name={"email"}
              label={"Email"}
              value={this.state.email}
              handler={this.handleChange}
              required
            />
            <FormInput
              type={"password"}
              name={"password"}
              label={"Password"}
              value={this.state.password}
              handler={this.handleChange}
              required
            />
            <FormInput
              type={"password"}
              name={"confirmPassword"}
              label={"Confirm Password"}
              value={this.state.confirmPassword}
              handler={this.handleChange}
              required
            />
            <FormButton type="submit">Sign Up</FormButton>
          </Form>
          <h5>
            Have an account?{" "}
            <FormRedirectLink to="/login">Login now</FormRedirectLink>
          </h5>
        </FormContainer>
      </SignUpContainer>
    );
  }
}

export default SignUp;
