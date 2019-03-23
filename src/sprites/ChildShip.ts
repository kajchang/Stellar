import Spaceship from './Spaceship';
import BirthingShip from './BirthingShip';

export default abstract class ChildShip extends Spaceship {
    parent: BirthingShip;

    init(x: number, y: number) {
        this.position = this.p.createVector(x, y);
    }
}
