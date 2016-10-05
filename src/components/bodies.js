import React, {Component}      from 'react';
import Matter, {World, Bodies} from 'matter-js';

export default class BodyComponent extends Component {

  static defaultProps = {
    dimensions: [0, 0, 0, 0],
    options:    {},
    shape:      'rectangle',
  };

  constructor(props) {
    super(props);

    this._body = Bodies[props.shape](...props.dimensions, props.options)

    this._childrenWithProps = React.Children.map(this.props.children,
        (child) => React.cloneElement(child, {
            body: this._body,
        })
    );
  }

  componentWillMount() {
    World.add(this.props.engine.world, this._body);
  }

  componentWillUnmount() {
    World.remove(this.props.engine.world, this._body);
  }

  render() {
    return (
      <div>{this._childrenWithProps}</div>
    )
  }
}
