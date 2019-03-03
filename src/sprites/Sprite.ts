import * as p5 from 'p5';

import Game from '../Game';
import SpriteManager from '../managers/SpriteManager';

export default abstract class Sprite {
    p: p5;
    manager: SpriteManager;
    game: Game;

    x: number;
    y: number;

    abstract init(): void
    abstract finished(): boolean
    abstract update(): void
    abstract draw(): void
}
