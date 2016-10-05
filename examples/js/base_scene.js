import React, {Component}      from 'react';
import { BodyComponent }       from '../../src/';

export default class BaseScene extends Component {

  constructor(props) {
    super(props);

    this.init = this.init.bind(this);
  }

  init(engine) {
  }

  componentWillMount() {
    this.props.sceneManager.start(this.init);
  }

  componentWillUnmount() {
    this.props.terminate();
  }

  render () {
    return (
      <div>
        <BodyComponent dimensions={[400, 200, 80, 80]} engine={this.props.engine}></BodyComponent>
        <BodyComponent dimensions={[450, 50, 80, 80]} engine={this.props.engine}></BodyComponent>
        <BodyComponent dimensions={[400, 610, 810, 60]} options={{isStatic: true}} engine={this.props.engine}></BodyComponent>
      </div>
    );
  }
}
