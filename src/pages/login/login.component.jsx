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

import {
  startGoogleSignIn,
  startEmailSignIn
} from "../../redux/user/user.actions";
import { connect } from "react-redux";
import { selectAuthError } from "../../redux/user/user.selectors";

class LogIn extends React.Component {
  state = {
    email: "",
    password: ""
  };

  storeCredentials = (e) => this.setState({ [e.target.name]: e.target.value });

  loginUser = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { startEmailSignIn } = this.props;
    startEmailSignIn({ email, password });
  };

  render() {
    const { startGoogleSignIn, loginErrorMsg } = this.props;
    return (
      <LoginContainer>
        <FormContainer>
          <FormTitle>LOGIN</FormTitle>
          <ErrorText>{loginErrorMsg}</ErrorText>
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
  }
}

const mapStateToProps = (state) => ({
  loginErrorMsg: selectAuthError(state)
});

const mapDispatchToProps = (dispatch) => ({
  startGoogleSignIn: () => dispatch(startGoogleSignIn()),
  startEmailSignIn: ({ email, password }) =>
    dispatch(startEmailSignIn({ email, password }))
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
