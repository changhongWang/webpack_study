const { SyncHook, AsyncSeriesHook } = require("tapable");

/*
 * @Description: 模拟compiler.js
 * @Author: changhong.wang
 * @Date: 2021-08-31 15:40:00
 * @LastEditors: changhong.wang
 * @LastEditTime: 2021-08-31 16:12:28
 */
module.exports = class Compiler {
  constructor() {
    this.hooks = {
      accelerate: new SyncHook(['newSpeed']),
      brake: new SyncHook(),
      calculateRoutes: new AsyncSeriesHook(['source', 'target', 'routesList']),
    };
  }

  run() {
    this.accelerate(10);
    this.brake();
    this.calculateRoutes('Async', 'hook', 'demo');
  }

  accelerate(speed) {
    this.hooks.accelerate.call(speed);
  }

  brake() {
    this.hooks.brake.call();
  }

  calculateRoutes() {
    this.hooks.calculateRoutes.promise(...arguments).then(() => {

    }, err => {
      console.error(err);
    });
  }
}