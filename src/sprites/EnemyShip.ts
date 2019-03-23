// @ts-ignore
import enemyship_image from '../assets/enemyship.png';

import ChildShip from './ChildShip';
import Layers from '../Layers';

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

        const target = this.manager.getTypeOfSprites('SPACESHIP', Layers.FOREGROUND).find(ship => ship.focus);

        if (target) {
            const a = Math.abs(this.y - target.y);
            const b = Math.abs(this.x - target.x);

            let targetAngle = Math.atan2(a, b) * 180 / Math.PI;
            if (target.x < this.x) {
                targetAngle += 180;
            }
            // this.pointDirection = targetAngle;
            const P = 0.1;
            this.turn(-(this.pointDirection - targetAngle) * P);

            this.accelerateForward();
            this.shoot();
        }
    }
}
