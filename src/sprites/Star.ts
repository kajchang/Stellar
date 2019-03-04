import Sprite from './Sprite';

export default class Star extends Sprite {
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

        this.p.ellipse(0, 0, 5)
    }

    // what's the chance?
    collisionVector(): number[] {
        return [];
    }
}
