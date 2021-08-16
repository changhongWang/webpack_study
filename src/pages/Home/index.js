/*
 * @Description:
 * @Author: changhong.wang
 * @Date: 2021-07-14 00:42:14
 * @LastEditors: changhong.wang
 * @LastEditTime: 2021-07-14 09:34:05
 */
import React, { Component } from "react";
import largeNumber from "@chwangstudy/large-number";
import "./index.scss";

const arr = ["Wang", "Changhong"];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dynamic: "",
    };
  }

  componentDidMount() {
    console.log(largeNumber("299", "88"));
  }

  dynamicImport() {
    import("./Components/Dynamic").then((res) => {
      console.log(787, res);
      this.setState({
        dynamic: res.default(),
      });
    });
  }

  render() {
    const { dynamic } = this.state;
    return (
      <div>
        <h3 className="title">This is renderred From React!</h3>
        <button
          type="button"
          onClick={() => {
            this.dynamicImport();
          }}
        >
          BTN
        </button>
        {dynamic}
        <ul className="name-list">
          {arr.map((item, index) => (
            <li key={index.toString()}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Home;
