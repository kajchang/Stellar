import * as p5 from 'p5';

import Game from './Game';

import SpriteManager from './managers/SpriteManager';
import Camera from './managers/Camera';

import PlayerShip from './sprites/PlayerShip';
import Star from './sprites/Star';
import Flagship from "./sprites/Flagship";

const sketch = (p: p5) => {
    const game = new Game(p.windowWidth * 4, p.windowHeight * 4);

    const ship = new PlayerShip();

    const spriteManager = new SpriteManager(p, 0);
    const camera = new Camera(p, ship);

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);

        game.addManager(camera);
        game.addManager(spriteManager);

        for (let i = 0; i < 100; i++) {
            spriteManager.addSprite(new Star);
        }

        spriteManager.addSprite(ship);
        spriteManager.addSprite(new Flagship());
    };

    p.draw = function () {
        game.executeManagers();
        game.cleanupManagers();
    };
};

new p5(sketch);
