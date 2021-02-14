import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { SimulationService } from './simulation.service';
import { Statistics } from './statistics/statistics.model';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @ViewChild('f', {static: false}) inputForm: NgForm;

  inputScale: number[] = [];
  firstInfected: number[] = [];
  matrix: string[][];

  inputText: string;
  
  // injecting services
  constructor(private simulationService: SimulationService) { }

  ngOnInit(): void {
  }

  // submit form handler
  // prepares input data (matrix, first infected) based on form input
  // sends input data to simulationService
  onSubmit(form: NgForm) {
    this.matrix = [];
    this.inputScale = [];
    this.inputScale.push(this.inputForm.value.xMatrix);
    this.inputScale.push(this.inputForm.value.yMatrix);
    this.firstInfected[0] = this.inputForm.value.xFI;
    this.firstInfected[1] = this.inputForm.value.yFI;

    /*this.getMatrixFromStr(this.inputForm.value.textInput);

    if(this.isRectangular(this.matrix) && this.isInRange(this.matrix, this.firstInfected)){
      console.log('correct');
      console.log(this.matrix);
      console.log(this.firstInfected);
      this.simulationService.loadSim(this.matrix, this.firstInfected)
    } else {
      alert("Invalid input data!")
    }*/

    // with dimension input
    if(this.inputForm.value.xFI < this.inputScale[0] && this.inputForm.value.yFI < this.inputScale[1]
      && this.inputScale[0] === this.inputScale[1]) {
      this.firstInfected = [];
      this.firstInfected.push(this.inputForm.value.xFI);
      this.firstInfected.push(this.inputForm.value.yFI);

      this.fillMatrix(this.matrix);

      this.simulationService.loadSim(this.matrix, this.firstInfected);

      this.inputForm.reset();
    } else {
      alert("Invalid input data!")
    }
    
  }

  // fills matrix elements with '#' for human
  private fillMatrix(matrix: string[][]) {
    for(let r = 0; r < this.inputScale[0]; r++) {
      matrix[r] = [];
      for(let c = 0; c < this.inputScale[1]; c++) {
        matrix[r][c]="#";
      }
    }
  }

  getMatrixFromStr(input: string) {
    this.matrix = input.split('/').map(function(x){return x.split('')})
  }

  isRectangular(matrix: string[][]): boolean {
    for(var i = 0; i < matrix.length-1; i++){
      if(matrix[i].length !== matrix[i+1].length){
        return false;
      }
    }
    return true;
  }

  isInRange(matrix:string[][], fInfected: number[]): boolean {
    if(fInfected[0] < 0 || fInfected[1] < 0){
      return false;
    }
    if(matrix[fInfected[0]][fInfected[1]] === '.') {
      return false;
    }
    for(var i = 0; i < matrix.length; i++){
      if(matrix[i].length > this.firstInfected[0] || matrix[i].length > this.firstInfected[1]){
        return true;
      }
    }
    return false;
  }
}
