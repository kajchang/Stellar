import * as p5 from 'p5';

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

    protected enabled = false;

    draw(): void {
        this.p.translate(this.x, this.y);

        const dRadians = this.pointDirection * (Math.PI / 180);
        this.p.rotate(dRadians);

        this.p.imageMode(this.p.CENTER);

        const image = this.enabled ? this.enabledImage : this.disabledImage;
        this.enabled = false;

        this.p.imageMode(this.p.CENTER);
        this.p.image(image, 0, 0, 50, 50);
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
        if (this.p.frameCount % this.shotFrequency == 0) {
            const dRadians = this.pointDirection * (Math.PI / 180);

            for (let gun of this.gunPositions) {
                const xOffset = gun * Math.sin(dRadians);
                const yOffset = gun * Math.cos(dRadians);

                this.manager.addSprite(new Bullet(this.x + xOffset, this.y + yOffset, this.directionX, this.directionY, this.pointDirection));
            }
        }
    }
}
