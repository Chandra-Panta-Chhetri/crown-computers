import React from "react";
import "./signup.styles.scss";
import { FormInput } from "../../components/form-input/form-input.component";
import { CustomButton } from "../../components/custom-button/custom-button.component";
import { addUserToDb } from "../../utils/firebase";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  createNewUser = (e) => {
    e.preventDefault();
    this.setState({
      displayName: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
  };

  storeCredentials = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="sign-up">
        <h1 className="page-title">Sign Up</h1>
        <span>Create a new account using an email and password</span>
        <form onSubmit={this.createNewUser}>
          <FormInput
            type={"text"}
            name={"displayName"}
            label={"full name"}
            value={this.state.displayName}
            handler={this.storeCredentials}
            required
          />
          <FormInput
            type={"email"}
            name={"email"}
            label={"email"}
            value={this.state.email}
            handler={this.storeCredentials}
            required
          />
          <FormInput
            type={"password"}
            name={"password"}
            label={"password"}
            value={this.state.password}
            handler={this.storeCredentials}
            required
          />
          <FormInput
            type={"password"}
            name={"confirmPassword"}
            label={"confirm password"}
            value={this.state.confirmPassword}
            handler={this.storeCredentials}
            required
          />
          <CustomButton type="submit">Sign Up</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
