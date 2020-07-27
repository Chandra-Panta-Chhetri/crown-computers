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
import { signUpStart, clearAuthError } from "../../redux/user/user.actions";
import { selectAuthError } from "../../redux/user/user.selectors";
import { connect } from "react-redux";

class SignUp extends React.Component {
  state = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  componentDidMount() {
    const { clearAuthError } = this.props;
    clearAuthError();
  }

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  createNewUser = (e) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword } = this.state;
    const { signUpUser } = this.props;
    signUpUser({ email, password, confirmPassword, fullName });
  };

  render() {
    const { signUpError } = this.props;
    return (
      <SignUpContainer>
        <FormContainer>
          <FormTitle>SIGN UP</FormTitle>
          <ErrorText>{signUpError}</ErrorText>
          <Form onSubmit={this.createNewUser}>
            <FormInput
              type={"text"}
              name={"fullName"}
              label={"Full Name"}
              value={this.state.fullName}
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

const mapStateToProps = (state) => ({
  signUpError: selectAuthError(state)
});

const mapDispatchToProps = (dispatch) => ({
  signUpUser: ({ email, password, confirmPassword, fullName }) =>
    dispatch(signUpStart({ email, password, confirmPassword, fullName })),
  clearAuthError: () => dispatch(clearAuthError())
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
