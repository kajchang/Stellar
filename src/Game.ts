import Manager from './managers/Manager';

export default class Game {
    readonly width: number;
    readonly height: number;

    private readonly managers: Manager[];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;

        this.managers = [];
    }

    addManager(manager: Manager): void {
        manager.game = this;
        this.managers.push(manager);
    }

    executeManagers(): void {
        for (let manager of this.managers) {
            manager.execute();
        }
    }

    cleanupManagers(): void {
        for (let manager of this.managers) {
            manager.cleanup();
        }
    }
}
