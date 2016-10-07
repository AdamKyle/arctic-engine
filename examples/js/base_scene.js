import React, {Component}        from 'react';
import { BodyComponent, Sprite, KeyHandler } from '../../src/';
import Matter                    from  'matter-js';
import Character                 from './character';

export default class BaseScene extends Component {

  constructor(props) {
    super(props);
  }

  init = (engine) => {
    const ground = Matter.Bodies.rectangle(
      400, 610, 1170, 800,
      {isStatic: true},
    );

    Matter.World.addBody(engine.world, ground);
  }

  componentWillMount() {
    this.props.sceneManager.start(this.init);
  }

  componentWillUnmount() {
    this.props.terminate();
  }

  render () {
    return (
      <div style={this.props.sceneManager.sceneStyles()}>
        <Character engine={this.props.engine} />
      </div>
    );
  }
}
