import Spaceship from './Spaceship';
import ChildShip from './ChildShip';

import Layers from '../Layers';

interface Constructor {
    new(x: number, y: number): ChildShip;
}

export default abstract class BirthingShip extends Spaceship {
    private birthingCounter = 0;
    protected birthingRate: number;
    protected maxChildren: number;
    protected childType: Constructor;

    update(): void {
        super.update();

        if (this.birthingCounter == 0 &&
            this.manager.getTypeOfSprites<ChildShip>('SPACESHIP', Layers.FOREGROUND).filter(ship => ship.parent == this).length < this.maxChildren) {
            this.birthingCounter = this.birthingRate;
            const child = new this.childType(this.x, this.y);
            child.parent = this;
            this.manager.addSprite(child, Layers.FOREGROUND);
        }

        if (this.birthingCounter > 0) {
            this.birthingCounter--;
        }
    }
}
