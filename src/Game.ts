import * as p5 from 'p5';

// @ts-ignore
import flagship_image from './assets/flagship.png';
// @ts-ignore
import enemyship_image from './assets/enemyship.png';
// @ts-ignore
import playership_image from './assets/playership.png';

import Manager from './managers/Manager';
import SpriteManager from './managers/SpriteManager';
import Camera from './managers/Camera';

interface IImages {
    ENEMYFLAGSHIP: p5.Image;
    ENEMYSHIP: p5.Image,
    PLAYERSHIP: p5.Image
}


export default class Game {
    private readonly p: p5;

    readonly width: number;
    readonly height: number;

    private readonly background: any;

    readonly spriteManager: SpriteManager;
    readonly camera: Camera;

    started: boolean;
    images: IImages;

    constructor(p: p5, width: number, height: number, background: any, spriteManager: SpriteManager, camera: Camera) {
        this.p = p;

        this.width = width;
        this.height = height;

        this.background = background;

        this.spriteManager = spriteManager;
        this.camera = camera;

        this.spriteManager.game = this;
        this.camera.game = this;

        this.started = false;

        this.images = {
            ENEMYFLAGSHIP: this.p.loadImage(flagship_image),
            ENEMYSHIP: this.p.loadImage(enemyship_image),
            PLAYERSHIP: this.p.loadImage(playership_image)
        };
    }

    executeManagers(): void {
        this.p.background(this.background);
        this.camera.execute();
        this.spriteManager.execute();
    }

    cleanupManagers(): void {
        this.camera.cleanup();
        this.spriteManager.cleanup();
    }

    getManager<Type extends Manager>(type: string): Type {
        return [this.camera, this.spriteManager].find(manager => manager.type == type) as unknown as Type;
    }
}
