import Spaceship from './Spaceship';
import ChildShip from './ChildShip';
import Layers from '../../Layers';

interface Constructor {
    new(): ChildShip;
}

export default abstract class BirthingShip extends Spaceship {
    private birthingCounter = 0;
    protected birthingRate: number;
    protected maxChildren: number;
    protected childType: Constructor;

    update(): void {
        super.update();

        if (this.birthingCounter > 0) {
            this.birthingCounter--;
        }
    }

    birth(): void {
        if (this.birthingCounter == 0 &&
            this.manager.getTypeOfSprites<ChildShip>('SPACESHIP', Layers.FOREGROUND).filter(ship => ship.parent == this).length < this.maxChildren) {

            this._birth(this.childType);

            this.birthingCounter = this.birthingRate;
        }
    }

    _birth(childType: Constructor): void {
        const child = new childType();
        child.parent = this;
        this.manager.addSprite(child, Layers.FOREGROUND, this.position.x, this.position.y);
    }
}
