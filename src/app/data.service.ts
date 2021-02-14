import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Statistics } from "./input/statistics/statistics.model";
import { StatisticsService } from "./input/statistics/statistics.service";
import {  catchError, map, tap } from 'rxjs/operators';
import { throwError } from "rxjs";
import { Simulation } from "./input/simulation.model";

// service for handling HTTP requests
@Injectable({providedIn: 'root'})
export class DataService {
    private url = 'https://localhost:44330/api/stats';

    constructor(private http: HttpClient) {}

    // get request
    // get statistics of a simulation based on its id
    getStats(simId: number) {
        const url = `${this.url}/${simId}`;
        return this.http
        .get<Statistics[]>(url)
        .pipe(
            map(data => {
                return data;
            }),
            catchError(errorRes => {
                return throwError(errorRes);
            })
        );
    }

    // post request
    // send data to server api, response - statistics of sent input data's simulation results
    postInput(matrix: string[][], firstI: number[]) {
        const postData = {InputScale: matrix, FirstInfected: firstI}

        return this.http.post<Simulation>(this.url, postData, {responseType: 'json'})
        .pipe(
            map(data => {
                return data;
            }),
            catchError(errorRes => {
                return throwError(errorRes);
            })
        );
    }
}