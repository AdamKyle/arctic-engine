import Matter, {Engine, World, Bodies, Events} from 'matter-js';

export default class SceneManager {

  constructor(loop) {
    this._engine = null;
    this._loopId = null;
    this._loop   = loop;
    this._stack  = [];

    this.init();
  }

  registerScenes(scenes) {
    if (!Array.isArray(scenes)) {
      this._stack.push(scenes);
    } else {
      this._stack = scenes;
    }

    this.goToScene(this._stack[0].type.name);
  }

  loop = () => {
    Engine.update(this._engine, 1000/60);
  }

  init() {
    const world  = Matter.World.create();
    this._engine = Engine.create({ world });
  }

  start(onInit, onUpdate, onCollision) {
    this._loopId = this._loop.push(this.loop);

    onInit.call(this, this._engine);

    if (onUpdate === undefined) {
      onUpdate = () => {};
    }

    if (onCollision === undefined) {
      onCollision = () => {};
    }

    Events.on(this._engine, 'afterUpdate', onUpdate);
    Events.on(this._engine, 'collisionStart', onCollision);
  }

  stop(onUpdate, onCollision) {
    this._currentScene = null;
    this._stack = [];

    this._loop.remove(this._loopId)

    Events.off(this._engine, 'afterUpdate', onUpdate);
    Events.off(this._engine, 'collisionStart', onCollision);
  }

  goToScene(scene) {
    if (scene === null || scene === undefined) {
      this._currentScene = this._stack[0];
    }

    this._stack.forEach((component) => {
      if (component.type.name === scene) {
        this._currentScene = component;
      }
    });
  }

  nextScene() {
    let position = 0;

    this._stack.forEach((component) => {
      if (component.type.name === this._currentScene.type.name) {
        position = this._stack.indexOf(component);
      }
    });

    position += 1;

    if (this._stack.lenth !== position) {
      this._currentScene = this._stack[position];
    }
  }

  previousScene() {
    let position = 0;

    this._stack.forEach((component) => {
      if (component.type.name === this._currentScene.type.name) {
        position = this._stack.indexOf(component);
      }
    });

    position -= 1;

    if (position >= 0) {
      this._currentScene = this._stack[position];
    }
  }

  sceneStyles() {
    return {
      width: 1170,
      height: 800,
    }
  }

  clear() {
    Matter.World.clear(this._engine.world, true);
  }

  getCurrentScene() {
    return this._currentScene;
  }

  getEngine() {
    return this._engine;
  }
}
