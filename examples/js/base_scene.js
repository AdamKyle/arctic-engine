import React, {Component}        from 'react';
import { BodyComponent, Sprite } from '../../src/';

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
        <BodyComponent dimensions={[400, 200, 80, 80]} engine={this.props.engine}>
          <Sprite spriteArgs={['./images/The-Poet.png', 48, 48, 0, 0, 100, 3, 4]} />
        </BodyComponent>
      </div>
    );
  }
}
