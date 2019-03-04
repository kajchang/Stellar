import Sprite from './Sprite';

export default class Bullet extends Sprite {
    private readonly directionX: number;
    private readonly directionY: number;

    private readonly pointDirection: number;

    readonly color: any;

    private lifespan = 60; // 1 sec at 60 fps
    private deathTick: number;

    type = 'BULLET';

    constructor(x: number, y: number, directionX: number, directionY: number, pointDirection: number, color: any) {
        super();

        const dRadians = pointDirection * (Math.PI / 180);

        this.x = x;
        this.y = y;

        this.directionX = 50 * Math.cos(dRadians) + directionX;
        this.directionY = 50 * Math.sin(dRadians) + directionY;

        this.pointDirection = pointDirection;

        this.color = color;
    }

    init(): void {
        this.deathTick = this.p.frameCount + this.lifespan;
    }

    finished(): boolean {
        return this.x >= this.game.width || this.x <= 0 || this.y >= this.game.height || this.y <= 0 || this.p.frameCount > this.deathTick;
    }

    update(): void {
        this.x += this.directionX;
        this.y += this.directionY;
    }

    draw(): void {
        this.p.fill(this.color);
        this.p.stroke(this.color);

        this.p.translate(this.x, this.y);

        const dRadians = this.pointDirection * (Math.PI / 180);

        this.p.rotate(dRadians);

        this.p.ellipseMode(this.p.CENTER);
        this.p.ellipse(0, 0, 10, 2);
    }

    collisionVector(): number[] {
        return [this.x, this.y, 10, 2];
    }
}
