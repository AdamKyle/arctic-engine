import React, { Component } from 'react';
import CoreSceneManager     from '../engine/scene_manager';

export default class SceneManager extends Component {

  constructor(props) {
    super(props);
    this._sceneManager = new CoreSceneManager(props.loop);

    this.next      = this.next.bind(this);
    this.previous  = this.previous.bind(this);
    this.goTo      = this.goTo.bind(this);
    this.terminate = this.terminate.bind(this);

    const childrenWithProps = React.Children.map(this.props.children,
        (child) => React.cloneElement(child, {
            sceneManager: this._sceneManager,
            next:         this.next,
            previous:     this.previous,
            goTo:         this.goTo,
            gameLoop:     props.loop,
            terminate:    this.terminate,
            engine:       this._sceneManager.getEngine(),
        })
    );

    this._sceneManager.registerScenes(childrenWithProps);

    this.state = {
      current_scene: this._sceneManager.getCurrentScene(),
    }
  }

  componentWillUnmount() {
    this._sceneManager.exit();
  }

  next() {
    this._sceneManager.nextScene();

    this.setState({
      current_scene: this._sceneManager.getCurrentScene()
    })
  }

  previous() {
    this._sceneManager.previousScene();

    this.setState({
      current_scene: this._sceneManager.getCurrentScene()
    });
  }

  goTo(sceneName) {
    this._sceneManager.goToScene(sceneName);

    this.setState({
      current_scene: this._sceneManager.getCurrentScene()
    })
  }

  cleanup() {
    this._sceneManager.clear();
  }

  terminate(onUpdate, onCollision) {

    if (onUpdate === undefined) {
      onUpdate = () => {};
    }

    if (onCollision === undefined) {
      onCollision = () => {};
    }

    this._sceneManager.stop(onUpdate, onCollision);

    this.setState({
      current_scene: null,
    }, () => {
      this.props.gameLoop.stop();
    });
  }

  render() {
    return(
      <div>
        {this.state.current_scene}
      </div>
    );
  }
}
