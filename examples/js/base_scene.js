import React, {Component}      from 'react';
import Matter, {Bodies, World} from 'matter-js';

export default class BaseScene extends Component {

  constructor(props) {
    super(props);

    this.init = this.init.bind(this);
  }

  init(engine) {
    var boxA   = Bodies.rectangle(400, 200, 80, 80);
    var boxB   = Bodies.rectangle(450, 50, 80, 80);
    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    World.add(engine.world, [boxA, boxB, ground])
  }

  componentWillMount() {
    this.props.sceneManager.start(this.init);
  }

  componentWillUnmount() {
    this.props.terminate();
  }

  render () {
    return (
      <div></div>
    );
  }
}
