import { thisExpression } from "@babel/types";
import React, { Component } from "react";

class Cliker extends Component {
  state = {
    colClick: 0,
  };

  increaseNum = () => {
    this.setState({ colClick: this.state.colClick + 1 });
  };
  reduceNum = () => {
    this.setState({ colClick: this.state.colClick - 1 });
  };

  render() {
    return (
      <div className="clicker">
        <button onClick={this.reduceNum} className="clicker">
          -
        </button>
        <p>{this.state.colClick}</p>
        <button onClick={this.increaseNum} className="clicker">
          +
        </button>
      </div>
    );
  }
}

export default Cliker;
