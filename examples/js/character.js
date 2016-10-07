import React, {Component}        from 'react';
import { BodyComponent, Sprite, KeyHandler } from '../../src/';
import Matter                    from  'matter-js';

export default class Character extends Component {

  constructor(props) {
    super(props);

    this._keyHandler = new KeyHandler();

    this._options = {
      position: {
        x: 0,
        y: 186
      },
    }

    this.state = {
      isJumping: false,
      position: {x: this._options.position.x, y: this._options.position.y}
    }
  }

  bodyIsJumping = (body) => {}

  update = () => {
    if (this._keyHandler.isDown(this._keyHandler.left())) {
      this.setState({
        position: {
          x: this.state.position.x - 10,
          y: this.state.position.y,
        }
      });
    }

    if (this._keyHandler.isDown(this._keyHandler.right())) {
      this.setState({
        position: {
          x: this.state.position.x + 10,
          y: this.state.position.y,
        }
      });
    }

    if (this._keyHandler.isDown(this._keyHandler.space())) {
      this.setState({
        isJumping: true,
      });
    }
  }

  componentDidMount() {
    this._keyHandler.startListening([
        this._keyHandler.left(),
        this._keyHandler.right(),
        this._keyHandler.down(),
        this._keyHandler.up(),
        this._keyHandler.space(),
    ]);
  }

  componentWillUnmount() {
    this._keyHandler.stopListening();
  }

  render () {
    return (
      <div>
        <BodyComponent dimensions={[0, 0, 48, 48]} engine={this.props.engine} options={this._options} update={this.update} jumping={this.bodyIsJumping} position={this.state.position}>
          <Sprite spriteArgs={['./images/The-Poet.png', 48, 48, 0, 0, 100, 3, 4]} />
        </BodyComponent>
      </div>
    );
  }
}
