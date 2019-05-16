import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, ChangeDetectorRef } from '@angular/core';

import { Chart } from 'chart.js';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.scss'],
})
export class LinechartComponent implements AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef;
  @Input() labels: any;
  @Input() data: any;

  public lineChart: any = [];

  constructor(
    private cdRef: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    this.addChart();
  }

  addChart() {
    this.lineChart = new Chart(this.canvas.nativeElement.getContext('2d'), {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
          data: this.data,
          fill: true,
          lineTension: 0.3,
          borderColor: '#389583',
          borderWidth: 2,
          backgroundColor: '#6cdf9f',
          pointBackgroundColor: '#05396B',
          pointBorderColor: '#05396B',
        }
      ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              suggestedMax: 5,
              suggestedMin: 1,
              stepSize: 1,
              beginAtZero: false
            }
          }]
        }
      },
    });
    this.cdRef.detectChanges();
  }
}
