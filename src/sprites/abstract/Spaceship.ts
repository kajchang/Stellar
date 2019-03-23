import * as p5 from 'p5';

import Layers from '../../Layers';

import Floater from './Floater';
import Bullet from '../Bullet';

import * as _ from 'lodash-es';
import { truncate } from '../../Math';

export default abstract class Spaceship extends Floater {
    protected image: p5.Image;

    maxSpeed: number;
    protected shotFrequency: number;

    protected acceleration: number;
    turnAmount: number;

    protected size: number;
    secondaryColor: any;

    private lastShot = 0;

    protected health: number;
    protected maxHealth: number;

    // protected gunPositions: number[];

    constructor() {
        super();

        this.type = 'SPACESHIP';
    }

    finished(): boolean {
        return this.health < 0;
    }

    update(): void {
        if (this.lastShot > 0) {
            this.lastShot--;
        }

        this.move();

        const collisions = this.manager.checkCollision<Bullet>(this, 'BULLET', Layers.FOREGROUND);

        for (let collision of collisions) {
            if (!_.isEqual(collision.color, this.secondaryColor)) {
                this.manager.removeSprite(collision, Layers.FOREGROUND);
                this.health--;
            }
        }
    }

    draw(): void {
        this.p.translate(this.position.x, this.position.y);

        this.p.noStroke();
        this.p.rectMode(this.p.CENTER);

        this.p.fill(100);
        this.p.rect(0, -this.size / 2 - 10, 55, 15);

        this.p.rectMode(this.p.CORNER);

        if (this.health > 0) {
            this.p.fill(this.secondaryColor);
            this.p.rect(-55 / 2 + 7 / 2, -this.size / 2 - 10 - 7 / 2, 48 * this.health / this.maxHealth, 8);
        }

        const dRadians = this.pointDirection * (Math.PI / 180);
        this.p.rotate(dRadians);

        this.p.imageMode(this.p.CENTER);
        this.p.image(this.image, 0, 0, this.size, this.size);

        // for (let gun of this.gunPositions) {
        //     this.p.stroke('red');
        //     this.p.fill('red');

        //     const xOffset = gun * Math.cos(dRadians);
        //     const yOffset = gun * Math.sin(dRadians);

        //     this.p.line(0, 0, 0, yOffset);
        //     this.p.line(0, yOffset, xOffset, yOffset);
        //     this.p.line(0, 0, xOffset, yOffset);
        //     this.p.ellipse(xOffset, yOffset, 2.5);
        // }
    }

    accelerate(dAmount: number): void {
        super.accelerate(dAmount);

        this.velocity.x = truncate(this.velocity.x, this.maxSpeed);
        this.velocity.y = truncate(this.velocity.y, this.maxSpeed);
    }

    move(): void {
        super.move();

        if (this.position.x >= this.game.width - this.size / 2 - 20) {
            this.health -= this.maxHealth / 300;
            this.position.x = this.game.width - this.size / 2 - 20;
            this.velocity.y /= 2;
        } else if (this.position.x <= this.size / 2 + 20) {
            this.health -= this.maxHealth / 300;
            this.position.x = this.size / 2 + 20;
            this.velocity.y /= 2;
        }

        if (this.position.y >= this.game.height - this.size / 2 - 20) {
            this.health -= this.maxHealth / 300;
            this.position.y = this.game.height - this.size / 2 - 20;
            this.velocity.x /= 2;
        } else if (this.position.y <= this.size / 2 + 20) {
            this.health -= this.maxHealth / 300;
            this.position.y = this.size / 2 + 20;
            this.velocity.x /= 2;
        }
    }

    turnLeft(): void {
        this.turn(-this.turnAmount);
    }

    turnRight(): void {
        this.turn(this.turnAmount);
    }

    accelerateForward(): void {
        this.accelerate(this.acceleration);
    }

    accelerateBackward(): void {
        this.accelerate(-this.acceleration);
    }

    shoot(): void {
        if (this.lastShot == 0) {
            // const dRadians = this.pointDirection * (Math.PI / 180);

            // for (let gun of this.gunPositions) {
            //     const xOffset = gun * Math.sin(dRadians);
            //     const yOffset = gun * Math.cos(dRadians);

            //     this.manager.addSprite(new Bullet(this.x + xOffset, this.y + yOffset, this.directionX, this.directionY, this.pointDirection, this.secondaryColor), Layers.FOREGROUND);
            // }

            this.manager.addSprite(new Bullet(), Layers.FOREGROUND, this.position.x, this.position.y, this.velocity.x, this.velocity.y, this.pointDirection, this.secondaryColor);

            this.lastShot = this.shotFrequency;
        }
    }

    collisionVector(): [number, number, number, number] {
        return [this.position.x, this.position.y, this.size, this.size];
    }
}
