import Spaceship from './Spaceship';
import BirthingShip from './BirthingShip';

export default abstract class ChildShip extends Spaceship {
    parent: BirthingShip;

    constructor(x: number, y: number) {
        super();

        this.x = x;
        this.y = y;
    }
}
