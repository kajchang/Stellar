import Sprite from './Sprite';
import Camera from '../managers/Camera';
import Spaceship from './Spaceship';

export default class MiniMap extends Sprite {
    init(): void {}

    finished(): boolean {
        return false;
    }

    draw(): void {
        const [x, y] = this.game.getManager<Camera>('CAMERA').getCenter();

        this.p.fill(50);
        this.p.strokeWeight(0);

        this.p.translate(-x + this.p.width - 100 * this.p.width / this.p.height, -y);

        this.p.rect(-5, 0, this.p.width - 100 * this.p.width / this.p.height + 5, 110);

        this.p.ellipseMode(this.p.CENTER);

        for (let ship of this.manager.getTypeOfSprites<Spaceship>('SPACESHIP', 1)) {
            this.p.fill(ship.secondaryColor);
            this.p.ellipse(ship.x * (100 * this.p.width / this.p.height / this.game.width) - 5, ship.y * (100 / this.game.height) + 5, 10);
        }
    }

    update(): void {
    }

    collisionVector(): [number, number, number, number] {
        return [0, 0, 0, 0];
    }
}
