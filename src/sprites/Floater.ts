import Sprite from './Sprite';

// Floater Logic ported from https://github.com/APCSLowell/AsteroidsGame/blob/master/Floater.pde

export default abstract class Floater extends Sprite {
    x: number;
    y: number;
    directionX: number;
    directionY: number;
    pointDirection: number;

    accelerate(dAmount: number): void {
        const dRadians = this.pointDirection * (Math.PI / 180);

        this.directionX += dAmount * Math.cos(dRadians);
        this.directionY += dAmount * Math.sin(dRadians);
    }

    turn(nDegreesOfRotation: number): void {
        this.pointDirection += nDegreesOfRotation;
    }

    move(): void {
        this.x += this.directionX;
        this.y += this.directionY;
    }
}
