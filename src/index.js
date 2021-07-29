/*
 * @Description:
 * @Author: changhong.wang
 * @Date: 2021-07-13 22:11:43
 * @LastEditors: changhong.wang
 * @LastEditTime: 2021-07-14 01:02:04
 */
import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";

const node = document.getElementById("root");

ReactDOM.render(<Home />, node);
const getResAfterSec = async (seconds = 2) => {
  const res = await new Promise((resolve) => {
    setTimeout(() => {
      return resolve("结果Here");
    }, seconds * 1000);
  });
  console.log(res);
  return 5;
};

console.log(8);

getResAfterSec(2);
