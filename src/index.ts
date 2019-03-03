import * as p5 from 'p5';

import SpriteManager from './managers/SpriteManager';
import PlayerShip from './sprites/PlayerShip';

const sketch = (p: p5) => {
    const manager = new SpriteManager(p, 0);

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);

        manager.addSprite(new PlayerShip());
    };

    p.draw = function () {
        manager.execute();
    }
};

new p5(sketch);
