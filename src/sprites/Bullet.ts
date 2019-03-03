import Sprite from './Sprite';

export default class Bullet extends Sprite {
    private x: number;
    private y: number;

    private readonly directionX: number;
    private readonly directionY: number;

    constructor(x: number, y: number, directionX: number, directionY: number, pointDirection: number) {
        super();
        //(Math.random() - 0.5 * 10)
        const dRadians = pointDirection * (Math.PI / 180);

        this.x = x;
        this.y = y;

        this.directionX = 50 * Math.cos(dRadians) + directionX;
        this.directionY = 50 * Math.sin(dRadians) + directionY;
    }

    init(): void {}

    finished(): boolean {
        return this.x >= this.p.width || this.x <= 0 || this.y >= this.p.height || this.y <= 0;
    }

    update(): void {
        this.x += this.directionX;
        this.y += this.directionY;
    }

    draw(): void {
        this.p.fill(255);
        this.p.stroke(255);

        this.p.translate(this.x, this.y);

        this.p.rect(0, 0, 1, 2);
    }
}
