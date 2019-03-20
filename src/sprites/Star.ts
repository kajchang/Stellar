import Sprite from './Sprite';

export default class Star extends Sprite {
    static STAR_SIZE = 5;

    init(): void {
        this.x = this.p.random(this.game.width);
        this.y = this.p.random(this.game.height)
    }

    finished(): boolean {
        return false;
    }

    update(): void {}

    draw(): void {
        this.p.translate(this.x, this.y);

        this.p.ellipse(0, 0, Star.STAR_SIZE);
    }

    collisionVector(): [number, number, number, number] {
        return [this.x, this.y, Star.STAR_SIZE, Star.STAR_SIZE];
    }
}
