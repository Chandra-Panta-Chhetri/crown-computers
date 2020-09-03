import React, { useState } from "react";
import { LoginContainer } from "./login.styles";
import {
  FormContainer,
  Form,
  FormTitle,
  FormButton
} from "../signup/signup.styles";

import FormInput from "../../components/form-input/form-input.component";
import { Link } from "react-router-dom";

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

  const handleUserCredentialsChange = (e) => {
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
            inputChangeHandler={handleUserCredentialsChange}
            required
          />
          <FormInput
            type="password"
            name="password"
            label="Password"
            inputValue={password}
            inputChangeHandler={handleUserCredentialsChange}
            required
          />
          <FormButton type="submit">Log In</FormButton>
          <h5>Or login with</h5>
          <FormButton type="button" onClick={startGoogleSignIn}>
            Google
          </FormButton>
        </Form>
        <h5>
          Don't have an account? <Link to="/signup">Sign up now</Link>
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
