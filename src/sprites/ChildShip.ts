import Spaceship from './Spaceship';

export default abstract class ChildShip extends Spaceship {
    constructor(x: number, y: number) {
        super();

        this.x = x;
        this.y = y;
    }
}
