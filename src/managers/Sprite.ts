import * as p5 from 'p5';

import SpriteManager from './SpriteManager';

export default abstract class Sprite {
    manager: SpriteManager;
    p: p5;

    abstract init(): void
    abstract finished(): boolean
    abstract update(): void
    abstract draw(): void
}
