export default class Sprite {

  constructor(src, w, h, x, y, speed, xFrames, yFrames) {

    this._isHiding        = false;
    this._isAnimating     = false;
    this._src             = src;
    this._height          = h;
    this._width           = w;
    this._x               = x;
    this._y               = y;
    this._speed           = speed || 4;
    this._xFrames         = xFrames || 1;
    this._yFrames         = yFrames || 1;
    this._frame           = 0;
  }

  height() {
    return this._height;
  }

  width() {
    return this._width;
  }

  xFrames() {
    return this._xFrames;
  }

  speed() {
    return this._speed;
  }

  x() {
    return this._x;
  }

  maxXFrames() {
    return this._width * this.xFrames();
  }

  maxYFrames() {
    return this._height * this._yFrames;
  }

  y() {
    return this._y;
  }

  setY(position) {
    this._y = position * this._width;
  }

  style(x, y, w, h) {

    let _x = x || this._x;
    let _y = y || this._y;
    let _w = w || this._width;
    let _h = h || this._height;

    return {
      backgroundImage: 'url('+this._src+')',
      backgroundPosition: _x * (- 1) + 'px ' + _y * (-1) + 'px',
      width: _w,
      height: _h,
    };
  }

}
