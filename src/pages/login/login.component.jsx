import React from "react";
import "./login.styles.scss";
import { FormInput } from "../../components/form-input/form-input.component";
import { CustomButton } from "../../components/custom-button/custom-button.component";
import { signInWithGoogle } from "../../configs/firebaseConfig";

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
        <h2 className="page-title">Log In</h2>
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
            <CustomButton onClick={signInWithGoogle}>
              Log In With Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default LogIn;
