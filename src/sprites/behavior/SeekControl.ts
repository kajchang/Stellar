import Sprite from '../abstract/Sprite';
import Spaceship from '../abstract/Spaceship';

import { truncate } from '../../Math';

export default (it: Spaceship, target: Sprite) => {
    if (target) {
        const a = Math.abs(it.position.y - target.position.y);
        const b = Math.abs(it.position.x - target.position.x);

        let targetAngle = Math.atan2(a, b) * 180 / Math.PI;
        if (target.position.x + 100 <= it.position.x) {
            targetAngle += 180;
        }

        it.turn(truncate(targetAngle - it.pointDirection, it.turnAmount));

        it.accelerateForward();
        it.shoot();
    }
}
