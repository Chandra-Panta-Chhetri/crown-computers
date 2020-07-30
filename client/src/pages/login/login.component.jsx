import React, { useState, useEffect } from "react";
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

import {
  startGoogleSignIn,
  startEmailSignIn,
  clearAuthError
} from "../../redux/user/user.actions";
import { connect } from "react-redux";
import { selectAuthError } from "../../redux/user/user.selectors";

const LogIn = ({
  startGoogleSignIn,
  loginErrorMsg,
  clearAuthError,
  startEmailSignIn
}) => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    clearAuthError();
  }, [clearAuthError]);

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
        <ErrorText>{loginErrorMsg}</ErrorText>
        <Form onSubmit={loginUser}>
          <FormInput
            type="email"
            name="email"
            label="Email"
            value={email}
            handler={storeCredentials}
            required
          />
          <FormInput
            type="password"
            name="password"
            label="Password"
            value={password}
            handler={storeCredentials}
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

const mapStateToProps = (state) => ({
  loginErrorMsg: selectAuthError(state)
});

const mapDispatchToProps = (dispatch) => ({
  startGoogleSignIn: () => dispatch(startGoogleSignIn()),
  startEmailSignIn: ({ email, password }) =>
    dispatch(startEmailSignIn({ email, password })),
  clearAuthError: () => dispatch(clearAuthError())
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
