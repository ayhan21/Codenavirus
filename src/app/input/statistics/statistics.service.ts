import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { DataService } from "../../data.service";
import { Statistics } from "./statistics.model";

@Injectable({providedIn: 'root'})
export class StatisticsService {

    constructor(private dataService: DataService) {}

    private stats: Statistics[] = [];

    getStats(simId: number): Statistics[] {
        console.log("get");
        console.log(this.stats);

        return this.stats.slice();
    }

    setStats(stats: Statistics[]) {
        this.stats = stats;
        console.log("set");
        console.log(this.stats);
    }

}