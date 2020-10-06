import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { switchMap, take } from 'rxjs/operators';
import { Progress } from 'src/app/models/progress.model';
import { ProgressService } from 'src/app/services/progress.service';
import { StoreService } from 'src/app/services/store.service';
import { Chart } from 'chart.js';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit, ViewWillEnter {
  progress: Progress[];
  @ViewChild('chartCanvas') canvas: ElementRef;

  private barChart: Chart;
  constructor(
    private store: StoreService,
    private progressService: ProgressService,
    private dateTransform: DatePipe
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.store.userData$
      .pipe(
        take(1),
        switchMap((user) => this.progressService.getProgress(user.id))
      )
      .subscribe((progress) => {
        this.progress = progress.list;
        if (progress.list.length) {
          this.draw();
        }
      });
  }

  draw() {
    const options = {
      responsive: false,
      maintainAspectRatio: false,
      legend: {
        fontColor: 'white',
      },
      scales: {
        xAxes: [
          {
            ticks: {
              fontColor: 'white',
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              fontColor: 'white',
            },
          },
        ],
      },
    };
    this.barChart = new Chart(this.canvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.progress.map((p) =>
          this.dateTransform.transform(p.date, 'MM/dd/yyyy')
        ),
        datasets: [
          {
            label: 'My Weight progress',
            fill: false,
            lineTension: 0.1,
            backgroundColor: '#02b2aa',
            borderColor: '#ff6644',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: ' #ff6644',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: ' #ff6644',
            pointHoverBorderColor: '#02b2aa',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.progress.map((p) => p.weight),
            spanGaps: false,
          },
        ],
      },
    });
  }
}
