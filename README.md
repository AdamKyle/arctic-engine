# Ice Cream Engine

Ice Cream Engine is an experimental engine written using [Matter JS](http://brm.io/matter-js/docs/index.html) and [React JS](https://facebook.github.io/react/). the whole goal is to create a small
prototype engine that can be used to make simple games. It consists of a Loop and a Scene Manager to handle various
scenes in your game.

## Core Concept

When it comes right down to it we have the most basic setup to get up and running:

```js
import {Loop, SceneManager} from 'engine';

<Loop>
  <SceneManager>
    // Scenes Here
  </SceneManager>
</Loop>
```

The entire game consists of scenes, which you switch back and forth from. Each scene is added to a stack that is then controlled through the scene manager api listed below. The scene manager has access to the loop, as does each scene, how ever most of what you will want to do can be done via the scene manager api, unless you are pushing to the loop stack, as demonstrated below in the loop API.

### Loop API

These methods can be called in each scene.

An instance of the loop is passed to the children as `loop`

| Method        | Params           | Returns  |
| ------------- |-------------| -----|
| **`push`**      | callback | the id (int) |
| **`pop`**      | null     |   null |
| **`remove`** | index | removes the index - 1 from the stack |
| **`start`** (called for you when the loop component mounts) | nothing      |    null |
| **`stop`**  (called for you when the loop component unmounts)| nothing      |    null |

## Scene Manager Api

This component has access to the loop and passes the loop to the children as `gameLoop`.

These methods can be called in each scene.

| Method        | Params           | Returns  |
| ------------- |-------------| -----|
| **`registerScenes`** (called for you in the scene manager component, see below for more info.)     | child component (or array of) | null |
| **`init`** (Called in the constructor of the engine/scene_manager.js)      | null      |   null |
| **`start`** | onInit, onUpdate, onCollision | Each param is a call back function. onInit is defined in the scene, each scene must call start (see below for more details) |
|**`terminate`**|onUpdate, onCollision|Stop all event processing on the engine. See below for more info. Clears all scenes from the scene manager and essentially ends the game. Never call this to terminate a scene.|
| **`goTo`** (Alias for `goToScene`) | scene name | each child component of SceneManager has a `.type.name`, based on this name, we then determine if that child component exists or not in the stack, if it does we head to it, if not we do nothing. |
|**`next`** (Alias for `nextScene`)|nothing| Goes to the next scene in the stack, assuming we are not at the last scene.|
|**`previous`** (Alias for `previousScene`)|nothing| goes to the previous scene in the stack, assuming we are not at the begining of the stack.|
|**`cleanup`** (Alias for `clear`)|nothing|Must be called by you on each scene's `componentWillUnmount` to clear the world of any objects for the next scene.|

- **`start(onInit, onUpdate, onCollision)`**: Each scene has to call this method and implement the following callbacks `onInit` which basically sets up your world and the objects in it, `onUpdate` and `onCollision`.

- **`stop('onUpdate, onCollision')`**: Stop is like terminate, in that it will stop the scene, but unlike terminate, it will not end the game. It only stops that specific scene and should be called in each scenes `coomponentDidMount` method, except for your base scene, that is where you should call terminate.

  Eg:

  ```js
  <Loop>
    <SceneManager>
      <BaseScene /> // Call terminate
      <SceneA />    // Call stop
      <SceneB />    // Call stop
      // ...
    </SceneManager>
  </Loop>

  /**
  Each of the above scenes can have children,
  just remember to pass the sceneManager
  and the loop to them for any processing
  you might need to do (if any).
  **/
  ```
- **`cleanup()`**: This cleans up the world, it will remove all bodies. Because we use Matter JS, the engine has a default world added to it. This is what you reference when you do `engine.world`
- **`registerScenes(scenes)`**: This is to be called in the constructor, and in the `SceneManager` component, it is. For example:

  ```js
  const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
          sceneManager: this._sceneManager,
          next:         this.next,
          previous:     this.previous,
          goTo:         this.goTo,
          gameLoop:     props.loop,
          terminate:    this.terminate,
      })
  );

  this._sceneManager.registerScenes(childrenWithProps);

  this.state = {
    current_scene: this._sceneManager.getCurrentScene(),
  }
  ```

  The above is what adds the children (BaseScene, SceneA, SceneB and so on from a previous example) to the scene manager stack. We start on the baseScene and then you have helper methods to allow you to move between scenes. Each time you do the previous scenes `componentWillUnmount` method is called. Make sure to clean up and stop the the previous scene before switching.

## Bodies

We have a body component that you would use in your scenes. This is what renders the bodies to the screen.

For each scene you will have:

```js
<BodyComponent
    shape={'rectangle'}
    dimensions={[x, y, w, h]}
    options={{}}
    position={{x: 0, y: 0}}
    jumping={func}
    update={func}
    engine={this.props.engine}
>
  // You have access to the body prop here.
</BodyComponent>
```

This would render out the body to the world. All children of the `BodyComponent` have access to a single property called `body`. This allows you to manipulate the body via [Matter JS's API](http://brm.io/matter-js/docs/index.html)

### options

options is an object that references the associated shape for the [body](http://brm.io/matter-js/docs/classes/Bodies.html).

### update

This is a function thats passed to the body to be added to it's Event handling for the engine update. This is where you handle things like character movement.

### jumping

This method gets passed a param called body, which is a reference to the [Body api in Matter JS](http://brm.io/matter-js/docs/classes/Body.html).

### position

This is a state object that gets updated when the the character moves left to right or is jumping or not. It gets passed and updates the stylistic properties of the body object. The `x` and `y` should start off referencing the
`options.position.x/y` and then be updated from there based on key presses.

## Sprites

To create a sprite is super simple all you have to do is use:

```js
  <Sprite spriteArgs={['./images/The-Poet.png', 48, 48, 0, 0, 100, 3, 4]} />
```

All Sprite characters should be 3x4 (that is 3*48 X 4*48), see the `example/images/The-Poet.png` for example.

The arguments are as follows: `img, width, height, x, y, speed, xFrames, yFrames`

- `img`: The source.
- `width`: The width of one frame.
- `height`: The height of one frame.
- `x`: Where the x position is (0, 48, 96, ...) (multiples of 48)
- `y`: Where the y position is: (0, 48, 96, ...) (multiples of 48)
- `speed`: the smaller, the faster we animate
- `xFrames`: How many frames across the top?
- `yFrames`: How many frames down the side?

> ATTN!
>
> The key handler that is used to listen for inputs for up, down, right, left only support an yFrame maximum of 4.
> Your `xFrames` can be as long as you want it to be, but your `yFrames` can only be 4 to represent the 4 directions.

We then want to attach the sprite to a body so that we can preform actions such as movement:

```js
<BodyComponent
    shape={'rectangle'}
    dimensions={[x, y, w, h]}
    options={{}}
    position={{x: 0, y: 0}}
    jumping={func}
    update={func}
    engine={this.props.engine}
>
  <Sprite spriteArgs={['./images/The-Poet.png', 48, 48, 0, 0, 100, 3, 4]} />
</BodyComponent>
```

All sprites should have a body component attached to them.

## Key Handler

The Key Handler is a class that any component can use that simply listens to key presses. The keys are: Left, Right, Up, Down and Space.

| Method        | Params | Returns  |
| ------------- |--------| ---------|
| **`left()`**  | None   | 37 (Key Code) |
| **`right()`** | None   | 39 (Key Code) |
| **`down()`**  | None   | 40 (Key Code) |
| **`up()`**    | None   | 38 (Key Code) |
| **`space()`** | None   | 32 (Key Code) |
| **`keyDown()`** | event | null (Sets the key code in the array to true, symbolizing its down) |
| **`keyUp()`**   | event | null (Sets the key code in the array to false, symbolizing its up) |
| **`isDown()`**  | keyCode | boolean |
| **`startListening()`** | Array | null (Takes an array of key codes and adds window listener for the `keyUp` and `keyDown`)|
| **`stopListening()`** | None | null (Removes the window listeners and stops listening to key inputs) |

> ATTN!!
>
> In the `componentDidMount` call `startListening` and in the `componentWillUnmount` call the
> `stopListening` function. This should be done in any component thats using the key handler.


# Building:

`npm install`

`gulp make:example` will build the example for you. to which you can use `ruby -run -e httpd . -p 3000` to serve the directory and run the example from `examples/`

At this time its not recommended you install and use this on your own projects. Instead download the source code and build the example.
