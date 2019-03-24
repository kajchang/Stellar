// @ts-ignore
import playership_image from '../assets/playership.png';

import Spaceship from './abstract/Spaceship';

import UserControl, { ARROWS, KEYBOARD } from './behavior/UserControl';

export default class PlayerShip extends Spaceship {
    init(): void {
        this.image = this.p.loadImage(playership_image);

        this.position = this.p.createVector(this.game.width / 4, this.game.height / 4);
        this.velocity = this.p.createVector(0, 0);

        this.pointDirection = 45;
        this.turnAmount = 2.5;

        this.size = 50;
        this.maxVelocity = 7.5;
        this.acceleration = this.maxVelocity / 5;

        this.secondaryColor = [0, 0, 255];

        this.health = 25;
        this.maxHealth = this.health;

        this.shotFrequency = 10;
        // this.gunPositions = [10, -10];
    }

    update(): void {
        super.update();

        UserControl(this, ARROWS);
    }
}
