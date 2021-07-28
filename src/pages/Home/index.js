/*
 * @Description:
 * @Author: changhong.wang
 * @Date: 2021-07-14 00:42:14
 * @LastEditors: changhong.wang
 * @LastEditTime: 2021-07-14 09:34:05
 */
import React, { Component } from "react";
import add from "@chwangstudy/large-number";
import "./index.scss";

const arr = ["Wang", "Changhong"];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dynamic: "",
    };
  }

  dynamicImport() {
    import("./Components/Dynamic").then((res) => {
      console.log(787, res);
      this.setState({
        dynamic: res.default(),
      });
    });
  }

  componentDidMount() {
    console.log(add);
  }

  render() {
    return (
      <div>
        <h3 className="title">This is renderred From React!</h3>
        <button
          onClick={() => {
            this.dynamicImport();
          }}
        >
          BTN
        </button>
        {this.state.dynamic ? this.state.dynamic : null}
        <ul className="name-list">
          {arr.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Home;
