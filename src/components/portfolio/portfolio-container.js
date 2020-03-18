import React, { Component } from "react";
import axios from "axios";

import PortfolioItem from "./portfolio-item";
import portfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
  // State
  //Lifecycle hooks
  //Forms
  //Reacts to changes
  //Constructors can be used

  //constructor called when class is instantiated
  constructor() {
    super();

    this.state = {
      pageTitle: "",
      isLoading: false,
      data: []
    };
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(filter) {
    this.setState({
      data: this.state.data.filter(item => {
        return item.category === filter;
      })
    });
  }

  getPortfolioItems() {
    axios
      .get("https://daneasimoneau.devcamp.space/portfolio/portfolio_items")
      .then(response => {
        // handle success
        console.log("Response Items", response);
        this.setState({
          data: response.data.portfolio_items
        });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }

  portfolioItems() {
    return this.state.data.map(item => {
      console.log("Portfolio Item", item);
      return <PortfolioItem key={item.id} item={item} />;
    });
  }

  componentDidMount() {
    this.getPortfolioItems();
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      //JSX

      <div className="portfolio-items-wrapper">
        <button className="btn" onClick={() => this.handleFilter("Education")}>
          Education
        </button>
        <button className="btn" onClick={() => this.handleFilter("Technology")}>
          Technology
        </button>
        <button className="btn" onClick={() => this.handleFilter("Example")}>
          Example
        </button>

        {this.portfolioItems()}
      </div>
    );
  }
}
