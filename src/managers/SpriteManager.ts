import * as p5 from 'p5';

import Sprite from './Sprite';

// @ts-ignore
export default class SpriteManager {
    private readonly sprites: Sprite[];
    private readonly p: p5;
    private readonly background: any;

    constructor(p: p5, background: any) {
        this.sprites = [];
        this.p = p;
        this.background = background;
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
