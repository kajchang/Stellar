import * as p5 from 'p5';

import Sprite from '../sprites/Sprite';
import Manager from './Manager';

interface Map<V> {
    [K: string]: V;
}

// @ts-ignore
export default class SpriteManager extends Manager {
    private readonly sprites: Map<Sprite[]>;
    private readonly background: any;

    constructor(p: p5, background: any) {
        super(p);

        this.sprites = {};
        this.background = background;
    }

    addSprite(sprite: Sprite): void {
        if (this.sprites[sprite.type] == undefined) {
            this.sprites[sprite.type] = [];
        }

        this.sprites[sprite.type].push(sprite);
        sprite.manager = this;
        sprite.game = this.game;
        sprite.p = this.p;
        sprite.init();
    }

    execute(): void {
        this.p.background(this.background);

        Object.keys(this.sprites).forEach(type => {
            for (let i = 0; i < this.sprites[type].length; i++) {
                this.p.push();

                const sprite = this.sprites[type][i];

                sprite.update();

                if (sprite.finished()) {
                    this.sprites[type].splice(i, 1);
                }

                sprite.draw();

                this.p.pop();
            }
        });
    }

    cleanup(): void {}
}
