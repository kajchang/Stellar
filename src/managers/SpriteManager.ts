import * as p5 from 'p5';

import Sprite from '../sprites/Sprite';
import Manager from './Manager';

// @ts-ignore
export default class SpriteManager extends Manager {
    private readonly sprites: Sprite[];
    private readonly background: any;

    constructor(p: p5, background: any) {
        super(p);

        this.sprites = [];
        this.background = background;
    }

    addSprite(sprite: Sprite): void {
        this.sprites.push(sprite);
        sprite.manager = this;
        sprite.game = this.game;
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

    cleanup(): void {}
}
