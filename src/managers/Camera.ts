import * as p5 from 'p5';

import Manager from './Manager';
import Sprite from '../sprites/Sprite';

export default class Camera extends Manager {
    cameraFocus: Sprite;

    constructor(p: p5, cameraFocus: Sprite) {
        super(p);

        this.type = 'CAMERA';

        this.cameraFocus = cameraFocus;
        this.cameraFocus.focus = true;
    }

    getCenter(): [number, number] {
        const xf = this.game.width / this.p.width;
        const yf = this.game.height / this.p.height;

        let xTrans, yTrans;

        if (this.cameraFocus.position.x > this.game.width - this.p.width / 2) {
            xTrans = -this.game.width * (xf - 1) / xf;
        } else if (this.cameraFocus.position.x < this.p.width / 2) {
            xTrans = 0;
        } else {
            xTrans = -this.cameraFocus.position.x + this.p.width / 2;
        }

        if (this.cameraFocus.position.y > this.game.height - this.p.height / 2) {
            yTrans = -this.game.height * (yf - 1) / yf;
        } else if (this.cameraFocus.position.y < this.p.height / 2) {
            yTrans = 0;
        } else {
            yTrans = -this.cameraFocus.position.y + this.p.height / 2;
        }

        return [xTrans, yTrans]
    }

    execute(): void {
        this.p.push();

        this.cameraFocus.update();

        let [xTrans, yTrans] = this.getCenter();

        this.p.translate(xTrans, yTrans);
    }

    cleanup(): void {
        this.p.pop();
    }
}
