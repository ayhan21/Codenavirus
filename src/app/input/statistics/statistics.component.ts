import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from '../../data.service';
import { Simulation } from '../simulation.model';
import { SimulationService } from '../simulation.service';
import { Statistics } from './statistics.model';
import { StatisticsService } from './statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit, OnDestroy {

  stats: Statistics[];
  simulation: Simulation;
  sub: Subscription;
  id: number;
  @ViewChild('f', {static: false}) searchForm: NgForm;

  // injection of service classes
  constructor(private dataService: DataService, private simulationService: SimulationService) { }

  // listening for changes in simEmmited
  ngOnInit(): void {
    this.sub = this.simulationService.simEmmited.subscribe(sim => {
      this.stats = sim.Stats;
      this.id = sim.SimId;
    });
  }

  // unsubscribing from Subject object
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // handler for submitting form 'Search sim results by id'
  onSubmit(form: NgForm) {
    this.dataService.getStats(this.searchForm.value.id).subscribe(data => {
      this.stats = data;
    })
  }

}
