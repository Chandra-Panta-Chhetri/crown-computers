import React from "react";
import { LoginContainer } from "./login.styles";
import {
  FormContainer,
  Form,
  FormTitle,
  ErrorText,
  FormButton,
  FormRedirectLink
} from "../signup/signup.styles";

import FormInput from "../../components/form-input/form-input.component";

import { signInWithGoogle } from "../../utils/firebaseConfig";
import { auth } from "../../utils/firebaseConfig";

class LogIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errorMessage: ""
    };
  }

  storeCredentials = (e) => this.setState({ [e.target.name]: e.target.value });

  loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ errorMessage: "" });
    } catch (e) {
      this.setState({
        errorMessage: "Incorrect password or email. Please try again."
      });
    }
    this.setState({ email: "", password: "" });
  };

  render() {
    return (
      <LoginContainer>
        <FormContainer>
          <FormTitle>LOGIN</FormTitle>
          <ErrorText>{this.state.errorMessage}</ErrorText>
          <Form onSubmit={this.loginUser}>
            <FormInput
              type={"email"}
              name={"email"}
              label={"Email"}
              value={this.state.email}
              handler={this.storeCredentials}
              required
            />
            <FormInput
              type={"password"}
              name={"password"}
              label={"Password"}
              value={this.state.password}
              handler={this.storeCredentials}
              required
            />
            <FormButton type="submit">Log In</FormButton>
            <h5>Or login with</h5>
            <FormButton onClick={signInWithGoogle}>
              <i className="fab fa-google"></i> Google
            </FormButton>
          </Form>
          <h5>
            Don't have an account?{" "}
            <FormRedirectLink to="/signup">Sign up now</FormRedirectLink>
          </h5>
        </FormContainer>
      </LoginContainer>
    );
  }
}

export default LogIn;
