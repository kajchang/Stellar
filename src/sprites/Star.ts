import Sprite from './Sprite';

export default class Star extends Sprite {
    static STAR_SIZE = 5;

    init(): void {
        this.position = this.p.createVector(this.p.random(this.game.width), this.p.random(this.game.height));
    }

    finished(): boolean {
        return false;
    }

    update(): void {}

    draw(): void {
        this.p.translate(this.position.x, this.position.y);

        this.p.ellipse(0, 0, Star.STAR_SIZE);
    }

    collisionVector(): [number, number, number, number] {
        return [this.position.x, this.position.y, Star.STAR_SIZE, Star.STAR_SIZE];
    }
}
