import Sprite from '../abstract/Sprite';
import Spaceship from '../abstract/Spaceship';

export default (it: Spaceship, target: Sprite) => {
    if (target) {
        // https://gamedevelopment.tutsplus.com/tutorials/understanding-steering-behaviors-seek--gamedev-849

        const maxForce = 0.25;

        const targetVelocity = target.position.copy().sub(it.position).normalize().mult(it.maxSpeed);
        const steering = targetVelocity.sub(it.velocity);

        steering.truncate(maxForce);

        it.velocity = steering.add(it.velocity).truncate(it.maxSpeed);

        it.pointDirection = Math.atan2(it.velocity.y, it.velocity.x) * 180 / Math.PI;

        // it.accelerateForward();
        it.shoot();
    }
}
