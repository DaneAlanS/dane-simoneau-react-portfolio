import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PortfolioContainer from "./portfolio/portfolio-container";
import NavigationContainer from "./navigation/navigation-container";
import Home from "./pages/home.js";
import About from "./pages/about.js";
import Contact from "./pages/contact.js";
import Blog from "./pages/blog.js";
import PortfolioDetail from "./portfolio/portfolio-detail";
import Auth from "./pages/auth";
import NoMatch from "./pages/no-match.js";

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <NavigationContainer />
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route path="/about-me" component={About}></Route>
              <Route path="/auth" component={Auth}></Route>
              <Route path="/contact" component={Contact}></Route>
              <Route path="/blog" component={Blog}></Route>
              <Route
                exact
                path="/portfolio/:slug"
                component={PortfolioDetail}
              ></Route>

              <Route component={NoMatch}></Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
