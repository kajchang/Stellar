import Manager from './managers/Manager';

interface Map<V> {
    [K: string]: V;
}

export default class Game {
    readonly width: number;
    readonly height: number;

    private readonly managers: Map<Manager>;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;

        this.managers = {};
    }

    addManager(manager: Manager): void {
        manager.game = this;
        this.managers[manager.type] = manager;
    }

    executeManagers(): void {
        for (let manager of Object.keys(this.managers)) {
            this.managers[manager].execute();
        }
    }

    cleanupManagers(): void {
        for (let manager of Object.keys(this.managers)) {
            this.managers[manager].cleanup();
        }
    }

    getManager<Type extends Manager>(type: string): Type {
        return this.managers[type] as Type;
    }
}
