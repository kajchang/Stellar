import * as p5 from 'p5';

import Sprite from '../sprites/Sprite';
import Manager from './Manager';

interface Map<V> {
    [K: string]: V;
}

// @ts-ignore
export default class SpriteManager extends Manager {
    private readonly sprites: Map<Sprite[]>[];

    type = "SPRITEMANAGER";

    constructor(p: p5) {
        super(p);

        this.sprites = [];
    }

    addSprite(sprite: Sprite, layer: number): void {
        if (this.sprites[layer] == undefined) {
            this.sprites[layer] = {};
        }

        if (this.sprites[layer][sprite.type] == undefined) {
            this.sprites[layer][sprite.type] = [];
        }

        this.sprites[layer][sprite.type].push(sprite);
        sprite.manager = this;
        sprite.game = this.game;
        sprite.p = this.p;
        sprite.init();
    }

    removeSprite(sprite: Sprite, layer: number): void {
        if (this.sprites[layer] == undefined || this.sprites[layer][sprite.type] == undefined) return;
        this.sprites[layer][sprite.type].splice(this.sprites[layer][sprite.type].indexOf(sprite), 1);
    }

    checkCollision<Type extends Sprite>(source: Sprite, type: string, layer: number): Type[] {
        const res: Type[] = [];

        for (let targetSprite of this.getTypeOfSprites<Type>(type, layer)) {
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

    getTypeOfSprites<Type extends Sprite>(type: string, layer: number): Type[] {
        return this.sprites[layer] == undefined || this.sprites[layer][type] == undefined? [] : this.sprites[layer][type] as Type[];
    }

    execute(): void {
        for (let layer of this.sprites) {
            Object.keys(layer).forEach(type => {
                for (let i = 0; i < layer[type].length; i++) {
                    const sprite = layer[type][i];

                    if (!sprite.focus) {
                        sprite.update();
                    }

                    this.p.push();

                    if (sprite.finished()) {
                        sprite.active = false;
                        layer[type].splice(i, 1);
                    }
                    sprite.draw();

                    this.p.pop();
                }
            });
        }
    }

    cleanup(): void {}
}
