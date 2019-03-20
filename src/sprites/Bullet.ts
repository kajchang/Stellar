import Sprite from './Sprite';

export default class Bullet extends Sprite {
    static BULLET_WIDTH = 2;
    static BULLET_HEIGHT = 10;
    static BULLET_SPEED = 50;


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

        this.directionX = Bullet.BULLET_SPEED * Math.cos(dRadians) + directionX;
        this.directionY = Bullet.BULLET_SPEED * Math.sin(dRadians) + directionY;

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
        this.p.ellipse(0, 0, Bullet.BULLET_HEIGHT,  Bullet.BULLET_WIDTH);
    }

    collisionVector(): [number, number, number, number] {
        return [this.x, this.y, Bullet.BULLET_HEIGHT, Bullet.BULLET_WIDTH];
    }
}
