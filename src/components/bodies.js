import React, {Component}      from 'react';
import Matter, {Events, World, Bodies} from 'matter-js';

export default class BodyComponent extends Component {

  static defaultProps = {
    dimensions: [0, 0, 0, 0],
    options:    {
      restitution: 0,
      friction: 1,
      frictionStatic: 0,
      position: {
        x: 0,
        y: 0
      },
    },
    shape: 'rectangle',
    update: () => {},
    jumping: () => {},
  };

  constructor(props) {
    super(props);

    this._body = Bodies[props.shape](...props.dimensions, props.options);

    this._childrenWithProps = React.Children.map(this.props.children,
        (child) => React.cloneElement(child, {
            body:   this._body,
            engine: this.props.engine,
        })
    );

    this.state = {
      bodyPositionX: 0,
      bodyPositionY: 0,
      isJumping: false,
    };
  }

  update = () => {
    this.props.jumping.call(this, this._body);

    if (this._body.velocity.y.toFixed(10) === 0) {
      Matter.Body.set(this._body, 'friction', 0.999);
    }

    if (this.state.bodyPositionX === 0 && this.state.bodyPositionY === 0) {
      this.setState({
        bodyPositionX: this._body.position.x,
        bodyPositionY: this._body.position.y,
      });
    }
  }

  calculateStyle = () => {
    let x = this.state.bodyPositionX;
    let y = this.state.bodyPositionY;

    return {
      position: 'absolute',
      transform: 'translate('+x+'px, '+y+'px)',
      transformOrigin: 'left top',
    }
  }

  componentWillMount() {
    World.add(this.props.engine.world, this._body);
  }

  componentDidMount() {
    Events.on(this.props.engine, 'afterUpdate', this.update);
    Events.on(this.props.engine, 'afterUpdate', this.props.update);
  }

  componentWillUnmount() {
    World.remove(this.props.engine.world, this._body);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      bodyPositionX: nextProps.position.x,
      bodyPositionY: nextProps.position.y,
    });
  }

  render() {
    return (
      <div style={this.calculateStyle()}>{this._childrenWithProps}</div>
    )
  }
}
