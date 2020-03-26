import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorText: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      //if passing with JS primitive need to wrap in brackets []
      [event.target.name]: event.target.value,
      errorText: ""
    });
  }

  handleSubmit(event) {
    //start a session
    axios
      .post(
        "https://api.devcamp.space/sessions",
        //client object for Jordan's api
        {
          client: {
            email: this.state.email,
            password: this.state.password
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        console.log("response", response);
        if (response.data.status === "created") {
          this.props.handleSuccessfulAuth();
        } else {
          this.setState({
            errorText: "Wrong email or password"
          });
          this.props.handleUnsuccessfulAuth();
        }
      })
      .catch(error => {
        this.setState({ errorText: "An error occurred!" });
        this.props.handleUnsuccessfulAuth();
      });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>LOGIN TO ACCESS YOUR DASHBOARD</h1>
        <h2>{this.state.errorText}</h2>
        {/* event is automatically being submitted */}
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={this.state.email}
            onChange={this.handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={this.state.password}
            onChange={this.handleChange}
          />

          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    );
  }
}
