// @ts-ignore
import spaceshipEnabled from '../assets/spaceship_enabled.png';
// @ts-ignore
import spaceshipDisabled from '../assets/spaceship_disabled.png';

import Spaceship from './Spaceship';

export default class PlayerShip extends Spaceship {
    init(): void {
        this.enabledImage = this.p.loadImage(spaceshipEnabled);
        this.disabledImage = this.p.loadImage(spaceshipDisabled);

        this.x = this.game.width / 2;
        this.y = this.game.height / 2;

        this.directionX = 0;
        this.directionY = 0;

        this.pointDirection = 0;

        this.shotFrequency = 10;
        this.gunPositions = [0];
        this.turnAmount = 2;

        this.size = 50;
        this.maxSpeed = 5;
        this.acceleration = this.maxSpeed / 5;

        this.bulletColor = [0, 0, 255];
    }

    finished(): boolean {
        return false;
    }

    update(): void {
        super.update();

        if (this.p.keyIsDown(38)) {
            this.accelerateForward();
        }

        if (this.p.keyIsDown(40)) {
            this.accelerateBackward();
        }

        if (this.p.keyIsDown(37)) {
            this.turnLeft();
        }

        if (this.p.keyIsDown(39)) {
            this.turnRight();
        }

        if (this.p.keyIsDown(32)) {
            this.shoot();
        }
    }
}
