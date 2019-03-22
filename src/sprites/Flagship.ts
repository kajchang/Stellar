// @ts-ignore
import flagship_image from '../assets/flagship.png';

import BirthingShip from './BirthingShip';
import EnemyShip from './EnemyShip';

export default class Flagship extends BirthingShip {
    init(): void {
        this.image = this.p.loadImage(flagship_image);

        this.x = this.game.width * 3 / 4;
        this.y = this.game.height * 3 / 4;

        this.directionX = 0;
        this.directionY = 0;

        this.pointDirection = 180;
        this.turnAmount = 0.5;

        this.size = 100;
        this.maxSpeed = this.size / 100;
        this.acceleration = this.maxSpeed / 5;

        this.secondaryColor = [255, 0, 0];

        this.health = 100;
        this.maxHealth = this.health;

        this.birthingRate = 600;
        this.childType = EnemyShip;

        // this.gunPositions = [10, -10];
    }

    update(): void {
        super.update();

        this.accelerateForward();
        this.turnRight();
    }
}
