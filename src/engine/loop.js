export default class Loop {

  constructor() {
    this._loopId = null;
    this._stack  = [];
  }

  loop = () => {
    this._stack.forEach((item) => {
      item.call();
    })

    this._loopId = window.requestAnimationFrame(this.loop);
  }

  push(callback) {
    return this._stack.push(callback);
  }

  pop() {
    this._stack.pop();
  }

  remove(index) {
    delete this._stack[index - 1];
  }

  start() {
    if (!this._loopId) {
      this.loop();
    }
  }

  stop() {
    window.cancelAnimationFrame(this._loopId);
  }
}
