import React, { useState } from "react";
import { LoginContainer } from "./login.styles";
import {
  FormContainer,
  Form,
  FormTitle,
  FormButton,
  FormRedirectLink
} from "../signup/signup.styles";

import FormInput from "../../components/form-input/form-input.component";

import {
  startGoogleSignIn,
  startEmailSignIn
} from "../../redux/user/user.actions";
import { connect } from "react-redux";

const LogIn = ({ startGoogleSignIn, startEmailSignIn }) => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: ""
  });

  const { email, password } = userCredentials;

  const storeCredentials = (e) => {
    const { value, name } = e.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const loginUser = (e) => {
    e.preventDefault();
    startEmailSignIn(userCredentials);
  };

  return (
    <LoginContainer>
      <FormContainer>
        <FormTitle>LOGIN</FormTitle>
        <Form onSubmit={loginUser}>
          <FormInput
            type="email"
            name="email"
            label="Email"
            inputValue={email}
            inputChangeHandler={storeCredentials}
            required
          />
          <FormInput
            type="password"
            name="password"
            label="Password"
            inputValue={password}
            inputChangeHandler={storeCredentials}
            required
          />
          <FormButton type="submit">Log In</FormButton>
          <h5>Or login with</h5>
          <FormButton type="button" onClick={startGoogleSignIn}>
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
};

const mapDispatchToProps = (dispatch) => ({
  startGoogleSignIn: () => dispatch(startGoogleSignIn()),
  startEmailSignIn: ({ email, password }) =>
    dispatch(startEmailSignIn({ email, password }))
});

export default connect(null, mapDispatchToProps)(LogIn);
