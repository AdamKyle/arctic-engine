export default class KeyHandler {

  constructor() {
    this._left  = 37;
    this._right = 39;
    this._up    = 38;
    this._down  = 40;
    this._space = 32;

    this._keys = {};
  }

  left() {
    return this._left;
  }

  right() {
    return this._right;
  }

  up() {
    return this._up;
  }

  down() {
    return this._down;
  }

  space() {
    return this._space;
  }

  keyDown = (event) => {
    if (event.keyCode in this._keys) {
      event.preventDefault();
      this._keys[event.keyCode] = true;
    }
  };

  keyUp = (event) => {
    if (event.keyCode in this._keys) {
      event.preventDefault();
      this._keys[event.keyCode] = false;
    }
  };

  isDown = (keyCode) => {
    return this._keys[keyCode] || false;
  }

  startListening = (keys) => {
    window.addEventListener('keydown', this.keyDown);
    window.addEventListener('keyup', this.keyUp);

    keys.forEach((key) => {
      this._keys[key] = false;
    });
  }

  stopListening = () => {
    window.removeEventListener('keydown', this.keyDown);
    window.removeEventListener('keyup', this.keyUp);
    this.keys = {};
  }
}
