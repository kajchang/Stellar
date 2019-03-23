// @ts-ignore
import enemyship_image from '../assets/enemyship.png';

import ChildShip from './ChildShip';
import Layers from '../Layers';

export default class EnemyShip extends ChildShip {
    init(x: number, y: number): void {
        super.init(x, y);

        this.image = this.p.loadImage(enemyship_image);

        this.velocity = this.p.createVector(0, 0);

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
            const a = Math.abs(this.position.y - target.position.y);
            const b = Math.abs(this.position.x - target.position.x);

            let targetAngle = Math.atan2(a, b) * 180 / Math.PI;
            if (target.position.x <= this.position.x) {
                targetAngle += 180;
            }
            const P = 0.1;
            this.turn(-(this.pointDirection - targetAngle) * P);

            this.accelerateForward();
            this.shoot();
        }
    }
}
