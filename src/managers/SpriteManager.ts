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

    removeSprite(sprite: Sprite): void {
        if (this.sprites[sprite.type] == undefined) return;
        this.sprites[sprite.type].splice(this.sprites[sprite.type].indexOf(sprite), 1);
    }

    checkCollision<Type extends Sprite>(source: Sprite, type: string): Type[] {
        if (this.sprites[type] == undefined) return [];

        const res: Type[] = [];

        for (let targetSprite of this.sprites[type]) {
            // basic rectangle collision

            const sourceCollisionVector = source.collisionVector();
            const sourceTopLeft = [sourceCollisionVector[0] - sourceCollisionVector[2], sourceCollisionVector[1] + sourceCollisionVector[3]];
            const sourceBottomRight = [sourceCollisionVector[0] + sourceCollisionVector[2], sourceCollisionVector[1] - sourceCollisionVector[3]];

            const targetCollisionVector = targetSprite.collisionVector();
            const targetTopLeft = [targetCollisionVector[0] - targetCollisionVector[2], targetCollisionVector[1] + targetCollisionVector[3]];
            const targetBottomRight = [targetCollisionVector[0] + targetCollisionVector[2], targetCollisionVector[1] - targetCollisionVector[3]];

            if (!(sourceTopLeft[0] > targetBottomRight[0] || targetTopLeft[0] > sourceBottomRight[0]) && !(sourceTopLeft[1] < targetBottomRight[1] || targetTopLeft[1] < sourceBottomRight[1])) {
                res.push(targetSprite as Type);
            }
        }

        return res;
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
