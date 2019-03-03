import * as p5 from 'p5';

export default abstract class Manager {
    protected p: p5;

    protected constructor(p: p5) {
        this.p = p;
    }

    abstract execute(): void;
}
