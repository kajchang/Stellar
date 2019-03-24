// @ts-ignore
import flagship_image from '../assets/flagship.png';

import BirthingShip from './abstract/BirthingShip';
import EnemyShip from './EnemyShip';

export default class EnemyFlagship extends BirthingShip {
    init(): void {
        this.image = this.p.loadImage(flagship_image);

        this.position = this.p.createVector(this.game.width * 3 / 4, this.game.height * 3 / 4);
        this.velocity = this.p.createVector(0, 0);

        this.pointDirection = 180;
        this.turnAmount = 2.5;

        this.size = 100;
        this.maxVelocity = this.size / 100;
        this.acceleration = this.maxVelocity / 5;

        this.secondaryColor = [255, 0, 0];

        this.health = 100;
        this.maxHealth = this.health;

        this.birthingRate = 300;
        this.maxChildren = 5;
        this.childType = EnemyShip;

        // this.gunPositions = [10, -10];
    }

    update(): void {
        super.update();

        this.accelerateForward();
        this.turnRight();
    }
}
