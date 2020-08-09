import React, { useState, useEffect } from "react";
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
import { signUpStart, clearAuthError } from "../../redux/user/user.actions";
import { selectAuthError } from "../../redux/user/user.selectors";
import { connect } from "react-redux";

const SignUp = ({ clearAuthError, signUpUser, signUpError }) => {
  const [newUserInfo, setNewUserInfo] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    clearAuthError();
  }, [clearAuthError]);

  const { fullName, email, password, confirmPassword } = newUserInfo;

  const handleChange = (e) => {
    const { value, name } = e.target;
    setNewUserInfo({ ...newUserInfo, [name]: value });
  };

  const createNewUser = (e) => {
    e.preventDefault();
    signUpUser(newUserInfo);
  };

  return (
    <SignUpContainer>
      <FormContainer>
        <FormTitle>SIGN UP</FormTitle>
        <ErrorText>{signUpError}</ErrorText>
        <Form onSubmit={createNewUser}>
          <FormInput
            type="text"
            name="fullName"
            label="Full Name"
            value={fullName}
            handler={handleChange}
            required
          />
          <FormInput
            type="email"
            name="email"
            label="Email"
            value={email}
            handler={handleChange}
            required
          />
          <FormInput
            type="password"
            name="password"
            label="Password"
            value={password}
            handler={handleChange}
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            value={confirmPassword}
            handler={handleChange}
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
};

const mapStateToProps = (state) => ({
  signUpError: selectAuthError(state)
});

const mapDispatchToProps = (dispatch) => ({
  signUpUser: ({ email, password, confirmPassword, fullName }) =>
    dispatch(signUpStart({ email, password, confirmPassword, fullName })),
  clearAuthError: () => dispatch(clearAuthError())
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
