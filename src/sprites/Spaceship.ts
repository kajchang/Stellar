import * as p5 from 'p5';

import Layers from '../Layers';

import Floater from './Floater';
import Bullet from './Bullet';

export default abstract class Spaceship extends Floater {
    protected enabledImage: p5.Image;
    protected disabledImage: p5.Image;

    protected maxSpeed: number;
    protected shotFrequency: number;
    protected gunPositions: number[];

    protected acceleration: number;
    protected turnAmount: number;

    protected size: number;
    secondaryColor: any;

    protected enabled = false;
    private lastShot: number;

    protected health: number;
    protected maxHealth: number;

    type = 'SPACESHIP';

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
            if (collision.color != this.secondaryColor) {
                this.manager.removeSprite(collision, Layers.FOREGROUND);
                this.health--;
            }
        }
    }

    draw(): void {
        this.p.translate(this.x, this.y);

        this.p.rectMode(this.p.CENTER);

        this.p.fill(100);
        this.p.rect(0, -this.size / 2 - 10, 55, 15);

        this.p.rectMode(this.p.CORNER);

        this.p.fill(this.secondaryColor);
        this.p.rect(-55 / 2 + 7 / 2, -this.size / 2 - 10 - 7 / 2, 48 * this.health / this.maxHealth, 8);

        const dRadians = this.pointDirection * (Math.PI / 180);
        this.p.rotate(dRadians);

        const image = this.enabled ? this.enabledImage : this.disabledImage;
        this.enabled = false;

        this.p.imageMode(this.p.CENTER);
        this.p.image(image, 0, 0, this.size, this.size);
    }

    accelerate(dAmount: number): void {
        super.accelerate(dAmount);

        if (this.directionX > this.maxSpeed) {
            this.directionX = this.maxSpeed;
        } else if (this.directionX < -this.maxSpeed) {
            this.directionX = -this.maxSpeed;
        }

        if (this.directionY > this.maxSpeed) {
            this.directionY = this.maxSpeed;
        } else if (this.directionY < -this.maxSpeed) {
            this.directionY = -this.maxSpeed;
        }
    }

    move(): void {
        super.move();

        if (this.x >= this.game.width - this.size / 2 - 20) {
            this.x = this.game.width - this.size / 2 - 20;
            this.directionY /= 2;
        } else if (this.x <= this.size / 2 + 20) {
            this.x = this.size / 2 + 20;
            this.directionY /= 2;
        }

        if (this.y >= this.game.height - this.size / 2 - 20) {
            this.y = this.game.height - this.size / 2 - 20;
            this.directionX /= 2;
        } else if (this.y <= this.size / 2 + 20) {
            this.y = this.size / 2 + 20;
            this.directionX /= 2;
        }
    }

    enable(): void {
        this.enabled = true;
    }

    turnLeft(): void {
        this.turn(-this.turnAmount);
        this.enable();
    }

    turnRight(): void {
        this.turn(this.turnAmount);
        this.enable();
    }

    accelerateForward(): void {
        this.accelerate(this.acceleration);
        this.enable();
    }

    accelerateBackward(): void {
        this.accelerate(-this.acceleration);
        this.enable();
    }

    shoot(): void {
        if (this.lastShot == null || this.lastShot == 0) {
            this.manager.addSprite(new Bullet(this.x, this.y, this.directionX, this.directionY, this.pointDirection, this.secondaryColor), Layers.FOREGROUND);

            this.lastShot = this.shotFrequency;
        }
    }

    collisionVector(): [number, number, number, number] {
        return [this.x, this.y, this.size, this.size];
    }
}
