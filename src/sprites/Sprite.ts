import * as p5 from 'p5';

import Game from '../Game';
import SpriteManager from '../managers/SpriteManager';

export default abstract class Sprite {
    p: p5;
    manager: SpriteManager;
    game: Game;

    position: p5.Vector;

    focus = false;
    active = true;

    type = 'SPRITE';

    abstract init(...args: any[]): void
    abstract finished(): boolean
    abstract update(): void
    abstract draw(): void
    abstract collisionVector(): [number, number, number, number];
}
