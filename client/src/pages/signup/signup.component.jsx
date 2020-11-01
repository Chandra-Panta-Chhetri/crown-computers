import React, { useState } from "react";
import {
  SignUpContainer,
  FormContainer,
  Form,
  FormTitle,
  FormButton
} from "./signup.styles";

import FormInput from "../../components/form-input/form-input.component";
import { Link } from "react-router-dom";

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
            label="Full Name*"
            inputValue={fullName}
            inputChangeHandler={handleChange}
            required
          />
          <FormInput
            type="email"
            name="email"
            label="Email*"
            inputValue={email}
            inputChangeHandler={handleChange}
            required
          />
          <FormInput
            type="password"
            name="password"
            label="Password*"
            inputValue={password}
            inputChangeHandler={handleChange}
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            label="Confirm Password*"
            inputValue={confirmPassword}
            inputChangeHandler={handleChange}
            required
          />
          <FormButton type="submit">Sign Up</FormButton>
        </Form>
        <h5>
          Have an account? <Link to="/login">Login now</Link>
        </h5>
      </FormContainer>
    </SignUpContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signUpUser: (newUserInfo) => dispatch(signUpStart(newUserInfo))
});

export default connect(null, mapDispatchToProps)(SignUp);
