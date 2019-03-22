import Spaceship from './Spaceship';
import ChildShip from './ChildShip';

import Layers from '../Layers';

interface Constructor {
    new(x: number, y: number): ChildShip;
}

export default abstract class BirthingShip extends Spaceship {
    private birthingCounter = 0;
    protected birthingRate: number;
    protected childType: Constructor;

    update(): void {
        super.update();

        if (this.birthingCounter == 0) {
            this.birthingCounter = this.birthingRate;
            this.manager.addSprite(new this.childType(this.x, this.y), Layers.FOREGROUND);
        }

        this.birthingCounter--;
    }
}
