// @ts-ignore
import enemyship_image from '../assets/enemyship.png';

import ChildShip from './ChildShip';

export default class EnemyShip extends ChildShip {
    init(): void {
        this.image = this.p.loadImage(enemyship_image);

        this.directionX = 0;
        this.directionY = 0;

        this.pointDirection = 225;
        this.turnAmount = 0.5;

        this.size = 50;
        this.maxSpeed = 5;
        this.acceleration = this.maxSpeed / 5;

        this.secondaryColor = [255, 0, 0];

        this.health = 5;
        this.maxHealth = this.health;

        this.shotFrequency = 10;
    }

    update(): void {
        super.update();

        this.accelerateForward();
        this.shoot();
    }
}
