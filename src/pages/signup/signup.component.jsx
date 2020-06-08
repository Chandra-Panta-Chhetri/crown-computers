import React from "react";
import "./signup.styles.scss";
import { FormInput } from "../../components/form-input/form-input.component";
import { Button } from "../../components/button/button.component";
import { addUserToDb, auth } from "../../utils/firebase";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      errorMessage: ""
    };
  }

  createNewUser = async (e) => {
    e.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      alert("Passwords must match!");
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(user);
      await addUserToDb(user, { displayName });
      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
    } catch (e) {
      this.setState({ errorMessage: e.message });
    }
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
        <p>{this.state.errorMessage}</p>
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
          <Button type="submit">Sign Up</Button>
        </form>
      </div>
    );
  }
}

export default SignUp;
