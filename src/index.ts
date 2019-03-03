import * as p5 from 'p5';

import Game from './Game';

import SpriteManager from './managers/SpriteManager';
import Camera from './managers/Camera';

import PlayerShip from './sprites/PlayerShip';

const sketch = (p: p5) => {
    const game = new Game(p.windowWidth * 2, p.windowHeight * 2);

    const ship = new PlayerShip();

    const spriteManager = new SpriteManager(p, 0);
    const camera = new Camera(p, ship);

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);

        game.addManager(camera);
        game.addManager(spriteManager);

        spriteManager.addSprite(ship);
    };

    p.draw = function () {
        game.executeManagers();
        game.cleanupManagers();
    };
};

new p5(sketch);
