import * as p5 from 'p5';

import Game from './Game';

import SpriteManager from './managers/SpriteManager';
import Camera from './managers/Camera';
import Layers from './Layers';

import PlayerShip from './sprites/PlayerShip';
import Star from './sprites/Star';
import EnemyFlagship from './sprites/EnemyFlagship';
import MiniMap from './sprites/MiniMap';

const sketch = (p: p5) => {
    let ship: PlayerShip, gameSpriteManager: SpriteManager, camera: Camera, game: Game, font: p5.Font;

    p.preload = function() {
        font = p.loadFont('Azonix.otf');

        ship = new PlayerShip();

        gameSpriteManager = new SpriteManager(p);
        camera = new Camera(p, ship);

        game = new Game(p, p.windowWidth * 6, p.windowWidth * 6, 0, gameSpriteManager, camera);
    };

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);

        for (let i = 0; i < 500; i++) {
            gameSpriteManager.addSprite(new Star, Layers.BACKGROUND);
        }

        gameSpriteManager.addSprite(ship, 1);
        gameSpriteManager.addSprite(new EnemyFlagship(), Layers.FOREGROUND);
        gameSpriteManager.addSprite(new MiniMap(), Layers.UI);
    };

    p.draw = function () {
        if (game.started) {
            game.executeManagers();
            game.cleanupManagers();
            if (!game.camera.cameraFocus.active) {
                p.preload();
                p.setup();
            }
        } else {
            p.background(0);
            p.textAlign(p.CENTER);
            p.fill(255);
            p.textFont('Azonix');
            p.textSize(p.width / 25);
            p.text('Press RETURN to Start.', p.width / 2, p.height / 2);
            if (p.keyIsDown(13)) {
                game.started = true;
            }
        }
    };

    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight);

    }
};

new p5(sketch);
