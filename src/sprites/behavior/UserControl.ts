import Spaceship from '../abstract/Spaceship';

export default (it: Spaceship, scheme: IControls) => {
    if (it.p.keyIsDown(scheme.FORWARD)) {
        it.accelerateForward();
    }

    if (it.p.keyIsDown(scheme.BACKWARD)) {
        it.accelerateBackward();
    }

    if (it.p.keyIsDown(scheme.LEFT)) {
        it.turnLeft();
    }

    if (it.p.keyIsDown(scheme.RIGHT)) {
        it.turnRight();
    }

    if (it.p.keyIsDown(scheme.SHOOT)) {
        it.shoot();
    }
}

interface IControls {
    FORWARD: number,
    RIGHT: number,
    LEFT: number,
    BACKWARD: number,
    SHOOT: number
}


const ARROWS: IControls = {
    FORWARD: 38,
    RIGHT: 39,
    LEFT: 37,
    BACKWARD: 40,
    SHOOT: 32
};

const KEYBOARD: IControls = {
    FORWARD: 87,
    RIGHT: 68,
    LEFT: 65,
    BACKWARD: 83,
    SHOOT: 32
};

export {
    ARROWS,
    KEYBOARD
}
