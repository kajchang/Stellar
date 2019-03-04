import * as p5 from 'p5';
import Game from '../Game';

export default abstract class Manager {
    protected p: p5;
    game: Game;

    type: string;

    protected constructor(p: p5) {
        this.p = p;
    }

    abstract execute(): void;
    abstract cleanup(): void;
}
