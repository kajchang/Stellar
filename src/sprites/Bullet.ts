import Sprite from './Sprite';

export default class Bullet extends Sprite {
    private readonly directionX: number;
    private readonly directionY: number;

    private readonly pointDirection: number;

    private size: number;
    private readonly color: any;

    private lifespan = 60; // 1 sec at 60 fps
    private deathTick: number;

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
        this.size = this.p.width / 128;
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

        this.p.ellipse(0, 0, this.size, this.size / 5);
    }
}
