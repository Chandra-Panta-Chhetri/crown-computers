import React from "react";
import "./signup.styles.scss";

import { FormInput } from "../../components/form-input/form-input.component";
import { Button } from "../../components/button/button.component";

import { addUserToDb, auth } from "../../utils/firebase";
import { Link } from "react-router-dom";

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
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords must match");
      }
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await addUserToDb(user, { displayName });
      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
        errorMessage: ""
      });
    } catch (e) {
      if (e.message !== "Passwords must match") {
        return this.setState({
          errorMessage: e.message,
          displayName: "",
          email: "",
          password: "",
          confirmPassword: ""
        });
      }
      this.setState({
        errorMessage: e.message
      });
    }
  };

  storeCredentials = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <section className="container">
        <div className="sign-up">
          <h1 className="page-title">SIGN UP</h1>
          <h5 className="error">{this.state.errorMessage}</h5>
          <form onSubmit={this.createNewUser}>
            <FormInput
              type={"text"}
              name={"displayName"}
              label={"Full Name"}
              value={this.state.displayName}
              handler={this.storeCredentials}
              required
            />
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
            <FormInput
              type={"password"}
              name={"confirmPassword"}
              label={"Confirm Password"}
              value={this.state.confirmPassword}
              handler={this.storeCredentials}
              required
            />
            <Button type="submit">Sign Up</Button>
          </form>
          <h5>
            Have an account? <Link to="/login">Login now</Link>
          </h5>
        </div>
      </section>
    );
  }
}

export default SignUp;
