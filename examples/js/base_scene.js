import React, {Component}        from 'react';
import { BodyComponent, Sprite } from '../../src/';
import Matter                    from  'matter-js';

export default class BaseScene extends Component {

  constructor(props) {
    super(props);

    this.init = this.init.bind(this);
  }

  init(engine) {
    const ground = Matter.Bodies.rectangle(
      this.props.sceneManager.sceneStyles().width,
      this.props.sceneManager.sceneStyles().height,
      0,
      -this.props.sceneManager.sceneStyles().height,
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
        <BodyComponent dimensions={[0, 0, 48, 48]} engine={this.props.engine}>
          <Sprite spriteArgs={['./images/The-Poet.png', 48, 48, 0, 0, 100, 3, 4]} />
        </BodyComponent>
      </div>
    );
  }
}
