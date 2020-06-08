import React from "react";
import "./login.styles.scss";
import { FormInput } from "../../components/form-input/form-input.component";
import { Button } from "../../components/button/button.component";
import { signInWithGoogle } from "../../utils/firebase";
import { auth } from "../../utils/firebase";

class LogIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errorMessage: ""
    };
  }

  storeCredentials = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: "", password: "" });
    } catch (e) {
      this.setState({ errorMessage: e.message, email: "", password: "" });
    }
  };

  render() {
    return (
      <div className="login">
        <h2 className="page-title">Log In</h2>
        <span>{this.state.errorMessage}</span>
        <form onSubmit={this.handleSubmit}>
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
          <div className="form-buttons">
            <Button type="submit">Log In</Button>
            <Button onClick={signInWithGoogle}>Log In With Google</Button>
          </div>
        </form>
      </div>
    );
  }
}

export default LogIn;
