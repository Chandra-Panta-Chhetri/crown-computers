import React from "react";
import "./login.styles.scss";
import { FormInput } from "../../components/form-input/form-input.component";
import { CustomButton } from "../../components/custom-button/custom-button.component";

class LogIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  storeCredentials = (e) => {
    this.setState({ [e.target.type]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ email: "", password: "" });
  };

  render() {
    return (
      <div className="login">
        <h2 class="page-title">I already have an Account</h2>
        <span>Log in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            type={"email"}
            label={"email"}
            value={this.state.email}
            handler={this.storeCredentials}
            required
          />
          <FormInput
            type={"password"}
            label={"password"}
            value={this.state.password}
            handler={this.storeCredentials}
            required
          />
          <div className="form-buttons">
            <CustomButton type="submit">Log In</CustomButton>
            <CustomButton>Log In With Google</CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default LogIn;
