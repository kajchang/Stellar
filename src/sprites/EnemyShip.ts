import SeekControl from './behavior/SeekControl';
import ArrivalControl from './behavior/ArrivalControl';
import ChildShip from './abstract/ChildShip';
import Layers from '../Layers';

export default class EnemyShip extends ChildShip {
    init(x: number, y: number): void {
        super.init(x, y);

        this.image = this.game.images.ENEMYSHIP;

        this.velocity = this.p.createVector(0, 0);

        this.pointDirection = 225;
        this.turnAmount = 2.5;

        this.size = 50;
        this.maxVelocity = 5;
        this.acceleration = this.maxVelocity / 5;

        this.secondaryColor = [255, 0, 0];

        this.health = 5;
        this.maxHealth = this.health;

        this.shotFrequency = 10;
    }

    update(): void {
        super.update();

        ArrivalControl(this,
                    this.manager.getTypeOfSprites('SPACESHIP', Layers.FOREGROUND).find(ship => ship.focus));
    }
}
