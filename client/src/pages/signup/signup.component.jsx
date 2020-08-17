import React, { useState } from "react";
import {
  SignUpContainer,
  FormContainer,
  Form,
  FormTitle,
  FormButton,
  FormRedirectLink
} from "./signup.styles";

import FormInput from "../../components/form-input/form-input.component";
import { signUpStart } from "../../redux/user/user.actions";
import { connect } from "react-redux";

const SignUp = ({ signUpUser }) => {
  const [newUserInfo, setNewUserInfo] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

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

const mapDispatchToProps = (dispatch) => ({
  signUpUser: ({ email, password, confirmPassword, fullName }) =>
    dispatch(signUpStart({ email, password, confirmPassword, fullName }))
});

export default connect(null, mapDispatchToProps)(SignUp);
