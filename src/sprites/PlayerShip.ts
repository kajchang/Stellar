// @ts-ignore
import playership_image from '../assets/playership.png';

import Spaceship from './Spaceship';

export default class PlayerShip extends Spaceship {
    init(): void {
        this.image = this.p.loadImage(playership_image);

        this.position = this.p.createVector(this.game.width / 4, this.game.height / 4);
        this.velocity = this.p.createVector(0, 0);

        this.pointDirection = 45;
        this.turnAmount = 2;

        this.size = 50;
        this.maxSpeed = 7.5;
        this.acceleration = this.maxSpeed / 5;

        this.secondaryColor = [0, 0, 255];

        this.health = 25;
        this.maxHealth = this.health;

        this.shotFrequency = 10;
        // this.gunPositions = [10, -10];
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
