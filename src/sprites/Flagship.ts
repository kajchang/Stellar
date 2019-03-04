// @ts-ignore
import flagshipEnabled from '../assets/flagship_enabled.png';
// @ts-ignore
import flagshipDisabled from '../assets/flagship_disabled.png';

import Spaceship from './Spaceship';

export default class Flagship extends Spaceship {
    init(): void {
        this.enabledImage = this.p.loadImage(flagshipEnabled);
        this.disabledImage = this.p.loadImage(flagshipDisabled);

        this.x = this.game.width / 2;
        this.y = this.game.height / 2;

        this.directionX = 0;
        this.directionY = 0;

        this.pointDirection = 180;
        this.turnAmount = 0.5;

        this.size = 100;
        this.maxSpeed = this.size / 100;
        this.acceleration = this.maxSpeed / 5;
    }

    finished(): boolean {
        return false;
    }

    update(): void {
        super.update();

        this.accelerateForward();
        this.turnRight();
    }
}
