import * as p5 from 'p5';

import Manager from './managers/Manager';
import SpriteManager from './managers/SpriteManager';
import Camera from './managers/Camera';

interface Map<V> {
    [K: string]: V;
}

export default class Game {
    private readonly p: p5;

    readonly width: number;
    readonly height: number;

    private readonly background: any;

    private readonly spriteManager: SpriteManager;
    private readonly camera: Camera;

    constructor(p: p5, width: number, height: number, background: any, spriteManager: SpriteManager, camera: Camera) {
        this.p = p;

        this.width = width;
        this.height = height;

        this.background = background;

        this.spriteManager = spriteManager;
        this.camera = camera;

        this.spriteManager.game = this;
        this.camera.game = this;
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
