// @ts-ignore
import enemyship_image from '../assets/enemyship.png';

import ChildShip from './abstract/ChildShip';
import Layers from '../Layers';

import SeekControl from './behavior/SeekControl';

export default class EnemyShip extends ChildShip {
    init(x: number, y: number): void {
        super.init(x, y);

        this.image = this.p.loadImage(enemyship_image);

        this.velocity = this.p.createVector(0, 0);

        this.pointDirection = 225;
        this.turnAmount = 2.5;

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

        SeekControl(this,
                    this.manager.getTypeOfSprites('SPACESHIP', Layers.FOREGROUND).find(ship => ship.focus));
    }
}
