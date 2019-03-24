import { Vector } from 'p5';

const truncate = (value: number, max: number): number => {
    if (value > max) {
        return max;
    } else if (value < -max) {
        return -max;
    } else {
        return value;
    }
};

declare module 'p5' {
    interface Vector {
        truncate(max: number): Vector;
    }
}

Vector.prototype.truncate = function(max: number) {
    this.x = truncate(this.x, max);
    this.y = truncate(this.y, max);
    // this.z = truncate(this.z, max);
    return this;
};

export {
    truncate
};
