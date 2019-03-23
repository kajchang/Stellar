const truncate = (value: number, max: number): number => {
    if (value > max) {
        return max;
    } else if (value < -max) {
        return -max;
    } else {
        return value;
    }
};


export {
    truncate
};
