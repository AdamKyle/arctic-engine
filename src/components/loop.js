import React, {Component} from 'react';
import GameLoop           from '../engine/loop';

export default class Loop extends Component {

  constructor(props) {
    super(props);

    this._loop = new GameLoop();

    this._children = React.Children.map(this.props.children,
        (child) => React.cloneElement(child, {
            loop: this._loop
        })
    );
  }

  componentWillMount() {
    this._loop.start();
  }

  componentWillUnmount() {
    this._loop.stop();
  }

  render() {
    return (
      <div>{this._children}</div>
    )
  }
}
