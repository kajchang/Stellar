import * as p5 from 'p5';

import Sprite from '../sprites/Sprite';
import Manager from './Manager';

// @ts-ignore
export default class SpriteManager extends Manager {
    private readonly sprites: Sprite[];
    private readonly p: p5;
    private readonly background: any;

    readonly width: number;
    readonly height: number;

    constructor(p: p5, background: any, width: number, height: number) {
        super(p);

        this.sprites = [];
        this.background = background;

        this.width = width;
        this.height = height;
    }

    addSprite(sprite: Sprite): void {
        this.sprites.push(sprite);
        sprite.manager = this;
        sprite.p = this.p;
        sprite.init()
    }

    execute(): void {
        this.p.background(this.background);

        for (let i = 0; i < this.sprites.length; i++) {
            this.p.push();

            const sprite = this.sprites[i];

            sprite.update();

            if (sprite.finished()) {
                this.sprites.splice(i, 1);
            }

            sprite.draw();

            this.p.pop();
        }
    }
}
