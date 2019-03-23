import * as p5 from 'p5';

import Sprite from './Sprite';

// Floater Logic ported from https://github.com/APCSLowell/AsteroidsGame/blob/master/Floater.pde

export default abstract class Floater extends Sprite {
    velocity: p5.Vector;
    pointDirection: number;

    accelerate(dAmount: number): void {
        const dRadians = this.pointDirection * (Math.PI / 180);

        this.velocity.add(dAmount * Math.cos(dRadians), dAmount * Math.sin(dRadians));
    }

    turn(nDegreesOfRotation: number): void {
        this.pointDirection += nDegreesOfRotation;
    }

    move(): void {
        this.position.add(this.velocity);
    }
}
