import {Loop, SceneManager}    from '../../src/';
import React, {Component}      from 'react';
import BaseScene               from './base_scene';

export default class Game extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Loop>
        <SceneManager>
          <BaseScene />
        </SceneManager>
      </Loop>
    );
  }
}
