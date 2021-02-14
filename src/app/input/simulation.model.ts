import { Statistics } from "./statistics/statistics.model";

export class Simulation {
    SimId: number;
    InputScale: string[][];
    FirstInfected: number[];
    Stats: Statistics[];

    constructor(id: number, scale: string[][], fInfected: number[], stats: Statistics[]) {
        this.SimId = id;
        this.InputScale = scale;
        this.FirstInfected = fInfected;
        this.Stats = stats;
    }
}