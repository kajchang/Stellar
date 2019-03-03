import * as p5 from 'p5';

import SpriteManager from './managers/SpriteManager';
import Camera from './managers/Camera';
import PlayerShip from './sprites/PlayerShip';

const sketch = (p: p5) => {
    const ship = new PlayerShip();

    const spriteManager = new SpriteManager(p, 0, p.windowWidth * 2, p.windowHeight * 2);
    const camera = new Camera(p, ship, p.windowWidth * 2, p.windowHeight * 2);

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);

        spriteManager.addSprite(ship);
    };

    p.draw = function () {
        camera.execute();

        spriteManager.execute();

        camera.cleanup();
    };
};

new p5(sketch);
