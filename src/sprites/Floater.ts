import * as p5 from "p5";

import Sprite from '../managers/Sprite';

// Floater Logic ported from https://github.com/APCSLowell/AsteroidsGame/blob/master/Floater.pde

export default abstract class Floater extends Sprite {
    protected image: p5.Image;
    protected x: number;
    protected y: number;
    protected directionX: number;
    protected directionY: number;
    protected pointDirection: number;

    protected maxSpeed: number;

    accelerate(dAmount: number): void {
        const dRadians = this.pointDirection * (Math.PI / 180);

        this.directionX += ((dAmount) * Math.cos(dRadians));
        this.directionY += ((dAmount) * Math.sin(dRadians));

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

    turn(nDegreesOfRotation: number): void {
        this.pointDirection += nDegreesOfRotation;
    }

    move(): void {
        this.x += this.directionX;
        this.y += this.directionY;
    }

    draw(): void {
        this.p.translate(this.x, this.y);

        const dRadians = this.pointDirection * (Math.PI / 180);
        this.p.rotate(dRadians);

        this.p.imageMode(this.p.CENTER);
        this.p.image(this.image, 0, 0, 25, 25);
    }
}
