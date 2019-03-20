import * as p5 from 'p5';

import Game from './Game';

import SpriteManager from './managers/SpriteManager';
import Camera from './managers/Camera';

import PlayerShip from './sprites/PlayerShip';
import Star from './sprites/Star';
import Flagship from './sprites/Flagship';
import MiniMap from './sprites/MiniMap';

const sketch = (p: p5) => {
    const ship = new PlayerShip();

    const gameSpriteManager = new SpriteManager(p);
    const camera = new Camera(p, ship);

    const game = new Game(p, p.windowWidth * 4, p.windowHeight * 4, 0, gameSpriteManager, camera);

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);

        for (let i = 0; i < 100; i++) {
            gameSpriteManager.addSprite(new Star, 0);
        }

        gameSpriteManager.addSprite(ship, 1);
        gameSpriteManager.addSprite(new Flagship(), 1);
        gameSpriteManager.addSprite(new MiniMap(), 2);
    };

    p.draw = function () {
        game.executeManagers();
        game.cleanupManagers();
    };
};

new p5(sketch);
