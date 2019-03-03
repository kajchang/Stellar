import * as p5 from 'p5';

import Manager from './Manager';
import Sprite from '../sprites/Sprite';

export default class Camera extends Manager {
    private cameraFocus: Sprite;

    private readonly width: number;
    private readonly height: number;

    constructor(p: p5, cameraFocus: Sprite, width: number, height: number) {
        super(p);

        this.cameraFocus = cameraFocus;

        this.width = width;
        this.height = height;
    }

    execute(): void {
        this.p.push();

        let xTrans, yTrans;

        if (this.cameraFocus.x > this.width - this.p.width / 2) {
            xTrans = -this.width / 2;
        } else if (this.cameraFocus.x < this.p.width / 2) {
            xTrans = 0;
        } else {
            xTrans = -this.cameraFocus.x + this.p.width / 2;
        }

        if (this.cameraFocus.y > this.height - this.p.height / 2) {
            yTrans = -this.height / 2;
        } else if (this.cameraFocus.y < this.p.height / 2) {
            yTrans = 0;
        } else {
            yTrans = -this.cameraFocus.y + this.p.height / 2;
        }

        this.p.translate(xTrans, yTrans);
    }

    cleanup(): void {
        this.p.pop();
    }
}
