// @ts-ignore
import spaceshipEnabled from '../assets/spaceship_enabled.png';
// @ts-ignore
import spaceshipDisabled from '../assets/spaceship_disabled.png';

import Floater from './Floater';

export default class PlayerShip extends Floater {
    init(): void {
        this.enabledImage = this.p.loadImage(spaceshipEnabled);
        this.disabledImage = this.p.loadImage(spaceshipDisabled);

        this.x = this.p.width / 2;
        this.y = this.p.height / 2;

        this.directionX = 0;
        this.directionY = 0;
        this.maxSpeed = 3;

        this.pointDirection = 0;
    }

    finished(): boolean {
        return false;
    }

    update(): void {
        if (this.p.keyIsDown(38)) {
            this.accelerate(this.maxSpeed / 5);
            this.enable();
        }

        if (this.p.keyIsDown(40)) {
            this.accelerate(-this.maxSpeed / 5);
            this.enable();
        }

        if (this.p.keyIsDown(37)) {
            this.turn(-2);
            this.enable();
        }

        if (this.p.keyIsDown(39)) {
            this.turn(2);
            this.enable();
        }

        this.move();
    }
}
