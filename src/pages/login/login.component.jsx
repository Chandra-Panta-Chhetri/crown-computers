import React from "react";
import "./login.styles.scss";
import { FormInput } from "../../components/form-input/form-input.component";
import { Button } from "../../components/button/button.component";
import { signInWithGoogle } from "../../utils/firebase";
import { auth } from "../../utils/firebase";
import { Link } from "react-router-dom";

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
      this.setState({
        errorMessage: "Incorrect password or email. Please try again.",
        email: "",
        password: ""
      });
    }
  };

  render() {
    return (
      <div className="login">
        <section>
          <h2 className="page-title">LOGIN</h2>
          <h5 className="error">{this.state.errorMessage}</h5>
          <form onSubmit={this.handleSubmit}>
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
            <div className="form-buttons">
              <Button type="submit" stretch={true}>
                Log In
              </Button>
              <h5>Or login with</h5>
              <Button onClick={signInWithGoogle}>
                <i className="fab fa-google"></i> Google
              </Button>
              <h5>
                Don't have an account? <Link to="/signup">Sign up now</Link>
              </h5>
            </div>
          </form>
        </section>
      </div>
    );
  }
}

export default LogIn;
