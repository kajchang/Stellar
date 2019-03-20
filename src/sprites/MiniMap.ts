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

        this.p.fill(255);

        this.p.translate(-x + this.p.width - 100 * this.p.width / this.p.height, -y);

        this.p.strokeWeight(0);
        this.p.ellipseMode(this.p.CENTER);

        for (let ship of this.manager.getTypeOfSprites<Spaceship>('SPACESHIP', 1)) {
            this.p.fill(ship.secondaryColor);
            this.p.ellipse(ship.x * (100 * this.p.width / this.p.height / this.game.width) - 3, ship.y * (100 / this.game.height) + 3, 10);
        }
    }

    update(): void {
    }

    collisionVector(): [number, number, number, number] {
        return [0, 0, 0, 0];
    }
}
