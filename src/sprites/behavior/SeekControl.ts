import Sprite from '../abstract/Sprite';
import Spaceship from '../abstract/Spaceship';

import { truncate } from '../../Math';

export default (it: Spaceship, target: Sprite) => {
    if (target) {
        const targetVelocity = target.position.copy().sub(it.position).normalize().mult(it.maxSpeed);
        const steering = targetVelocity.sub(it.velocity);

        steering.x = truncate(it.velocity.x + steering.x, it.maxSpeed);
        steering.y = truncate(it.velocity.x + steering.y, it.maxSpeed);

        it.velocity = steering;

        it.pointDirection = Math.atan2(it.velocity.y, it.velocity.x) * 180 / Math.PI;

        // it.accelerateForward();
        it.shoot();
    }
}
