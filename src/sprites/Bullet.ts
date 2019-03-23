import * as p5 from 'p5';

import Sprite from './abstract/Sprite';

export default class Bullet extends Sprite {
    static BULLET_WIDTH = 2;
    static BULLET_HEIGHT = 10;
    static BULLET_SPEED = 50;

    private velocity: p5.Vector;

    private pointDirection: number;

    color: any;

    private lifespan = 10;
    private deathTick: number;

    constructor() {
        super();

        this.type = 'BULLET';
    }


    init(x: number, y: number, directionX: number, directionY: number, pointDirection: number, color: any): void {
        const dRadians = pointDirection * (Math.PI / 180);

        this.position = this.p.createVector(x, y);
        this.velocity = this.p.createVector(Bullet.BULLET_SPEED * Math.cos(dRadians) + directionX, Bullet.BULLET_SPEED * Math.sin(dRadians) + directionY);

        this.pointDirection = pointDirection;

        this.color = color;

        this.deathTick = this.p.frameCount + this.lifespan;
    }

    finished(): boolean {
        return this.position.x >= this.game.width || this.position.x <= 0 || this.position.y >= this.game.height || this.position.y <= 0 || this.p.frameCount > this.deathTick;
    }

    update(): void {
        this.position.add(this.velocity);
    }

    draw(): void {
        this.p.fill(this.color);
        this.p.stroke(this.color);

        this.p.translate(this.position.x, this.position.y);

        const dRadians = this.pointDirection * (Math.PI / 180);

        this.p.rotate(dRadians);

        this.p.ellipseMode(this.p.CENTER);
        this.p.ellipse(0, 0, Bullet.BULLET_HEIGHT,  Bullet.BULLET_WIDTH);
    }

    collisionVector(): [number, number, number, number] {
        return [this.position.x, this.position.y, Bullet.BULLET_HEIGHT, Bullet.BULLET_WIDTH];
    }
}
