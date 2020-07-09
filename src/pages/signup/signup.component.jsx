import React from "react";
import "./signup.styles.scss";

import FormInput from "../../components/form-input/form-input.component";
import Button from "../../components/button/button.component";

import { addUserToDb, auth } from "../../utils/firebaseConfig";
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
        return this.setState({
          errorMessage: "Passwords must match"
        });
      }
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await addUserToDb(user, { displayName });
    } catch (e) {
      this.setState({
        errorMessage: e.message,
        displayName: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
    }
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

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
