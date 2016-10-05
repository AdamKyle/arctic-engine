import Game     from './js/game';
import React    from 'react';
import ReactDOM from 'react-dom';

var gameElement = document.getElementById("example-game");

if (gameElement !== null) {
    ReactDOM.render(
        <Game />,
        gameElement
    );
}
