import React, { Component } from 'react';
import CoreSprite           from '../engine/sprite';
import Matter               from 'matter-js';
import {KeyHandler}         from '../';

export default class Sprite extends Component {

  static defaultProps = {
    spriteArgs: [
      '', 0, 0, 0, 0, 0, 1, 1
    ],
  };

  constructor(props) {
    super(props);

    this._sprite      = new CoreSprite(...props.spriteArgs);
    this._loopId      = null;
    this._keyHandler  = new KeyHandler();

    this.state = {
      current_frame: 0,
    }
  }

  updateSpriteDirection = () => {
    if (this._keyHandler.isDown(this._keyHandler.down())) {
      this._sprite.setY(0);
    }

    if (this._keyHandler.isDown(this._keyHandler.up())) {
      this._sprite.setY(3);
    }

    if (this._keyHandler.isDown(this._keyHandler.left())) {
      this._sprite.setY(1);
    }

    if (this._keyHandler.isDown(this._keyHandler.right())) {
      this._sprite.setY(2);
    }
  }

  componentDidMount() {
    Matter.Events.on(this.props.engine, 'afterUpdate', this.updateSpriteDirection);

    this._keyHandler.startListening([
        this._keyHandler.left(),
        this._keyHandler.right(),
        this._keyHandler.down(),
        this._keyHandler.up(),
        this._keyHandler.space(),
    ]);

    this._loopId = setInterval(() => {
      if (this.state.current_frame === this._sprite.xFrames()) {
        this.setState({
          current_frame: 0,
        });
      }

      this.setState({
        current_frame: this.state.current_frame + 1,
      });
    }, this._sprite.speed());
  }

  componentWillUnmount() {
    clearInterval(this._loopId);
    this._keyHandler.stopListening();
    Matter.Events.off(this.props.engine, 'afterUpdate', this.update);
  }

  render() {
    let position = (this._sprite.width() * this.state.current_frame);
    let x        = 0;

    if (position < this._sprite.maxXFrames()){
     x = position;
    }

    let y = this._sprite.y();
    let w = this._sprite.width();
    let h = this._sprite.height();

    return (
      <div style={this._sprite.style(x, y, w, h)} />
    );
  }
}
