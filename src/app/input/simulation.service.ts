import { Injectable } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { DataService } from "../data.service";
import { Simulation } from "./simulation.model";
import { Statistics } from "./statistics/statistics.model";

// Service for calling post method
// sends received input data to HTTP handling service and receives simulation data
@Injectable({providedIn: 'root'})
export class SimulationService {

    simulation: Simulation;
    stats: Statistics[];
    statEmmited = new Subject<Statistics[]>();
    simEmmited = new Subject<Simulation>();

    constructor(private dataService: DataService) {}

    loadSim(matrix: string[][], firstI: number[]) {
        this.dataService.postInput(matrix, firstI)
        .subscribe(data => {
            this.simulation = data;
            this.simEmmited.next(this.simulation);
        });
    }

    getSim(): Simulation {
        return this.simulation;
    }
}