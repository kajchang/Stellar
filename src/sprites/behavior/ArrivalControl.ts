import Sprite from '../abstract/Sprite';
import Spaceship from '../abstract/Spaceship';

export default (it: Spaceship, target: Sprite) => {
    if (target) {
        // https://www.red3d.com/cwr/steer/gdc99/

        const maxForce = 0.1;
        const slowingDistance = 250;

        const offset = target.position.copy().sub(it.position);
        const distance = Math.sqrt(Math.pow(offset.x, 2) + Math.pow(offset.y, 2));

        const rampedVelocity = it.maxVelocity * (distance / slowingDistance);
        const clippedVelocity = Math.min(rampedVelocity, it.maxVelocity);

        const targetVelocity = offset.mult(clippedVelocity / distance);
        const steering = targetVelocity.sub(it.velocity);

        steering.truncate(maxForce);

        it.velocity = steering.add(it.velocity).truncate(it.maxVelocity);

        it.pointDirection = Math.atan2(it.velocity.y, it.velocity.x) * 180 / Math.PI;

        // it.accelerateForward();
        it.shoot();
    }
}
