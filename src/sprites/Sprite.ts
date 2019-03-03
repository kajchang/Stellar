import * as p5 from 'p5';

import SpriteManager from '../managers/SpriteManager';

export default abstract class Sprite {
    p: p5;
    manager: SpriteManager;

    x: number;
    y: number;

    abstract init(): void
    abstract finished(): boolean
    abstract update(): void
    abstract draw(): void
}
