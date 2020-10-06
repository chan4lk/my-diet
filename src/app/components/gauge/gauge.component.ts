import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chart, ChartOptions } from 'chart.js';
import { DietDetails } from 'src/app/models/diet.model';
import { toFixed } from 'src/app/services/utils';
import { KiloFormaterPipe } from '../number-pipe/number.pipe';
@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss'],
})
export class GaugeComponent implements OnInit {
  private _diet: DietDetails = {
    breakfast: [],
    lunch: [],
    dinner: [],
    max: 0,
    total: 0,
  };

  private _total = 0;
  chart: Chart;

  @Input() set diet(value: DietDetails) {
    this._diet = value;
  }

  @Input() set total(value: number) {
    this._total = value;
    this.draw();
  }

  @ViewChild('chartCanvas', { static: true }) canvas: ElementRef;

  constructor(private formatter: KiloFormaterPipe) {}

  ngOnInit() {
    Chart.pluginService.register({
      beforeDraw(chart) {
        if ((chart.config.options as any).middleText) {
          const width = chart.width;
          const height = chart.height;
          const ctx = chart.ctx;

          ctx.restore();
          const fontSize = (height / 114).toFixed(2);
          ctx.font = fontSize + 'em sans-serif';
          ctx.textBaseline = 'middle';

          const text = (chart.config.options as any).middleText;
          const textX = Math.round((width - ctx.measureText(text).width) / 2);
          const textY = height / 2;

          ctx.fillText(text, textX, textY);
          ctx.save();
        }
      },
    });
  }

  private calculateData() {
    let protiene = 0;
    let carbo = 0;
    let fat = 0;

    const calc = (f: {
      protine: number;
      foodQuantity: number;
      carbohydrate: number;
      fat: number;
    }) => {
      protiene += (f.protine / 100) * f.foodQuantity * 4;
      carbo += (f.carbohydrate / 100) * f.foodQuantity * 4;
      fat += (f.fat / 100) * f.foodQuantity * 9;
    };

    this._diet.breakfast.forEach(calc);
    this._diet.lunch.forEach(calc);
    this._diet.dinner.forEach(calc);

    return {
      protiene,
      carbo,
      fat,
      percentage: (this._total / this._diet.max || 1) * 100,
    };
  }

  draw(): void {
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 18;
    const data = this.calculateData();
    const oilData = {
      labels: ['Protiene', 'Carbohydrates', 'Fat'],
      datasets: [
        {
          data: [data.protiene, data.carbo, data.fat],
          backgroundColor: ['#02b2aa', '#029d96', '#1bbab3'],
          borderColor: 'black',
          borderWidth: 2,
        },
      ],
    };

    const chartOptions: ChartOptions = {
      rotation: -Math.PI,
      cutoutPercentage: 30,
      circumference: Math.PI,
      legend: {
        display: false,
      },
      animation: {
        animateRotate: false,
        animateScale: true,
      },
    };

    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'doughnut',
      data: oilData,
      options: {
        middleText: `${toFixed(data.percentage)}%`,
        responsive: true,
        legend: {
          display: false,
        },
        tooltips: {
          callbacks: {
            label: (item, itemData) => {
              return (
                itemData.labels[item.index] +
                ':' +
                this.formatter.transform(
                  itemData.datasets[0].data[item.index]
                ) +
                'C'
              );
            },
          },
        },
      } as ChartOptions,
    });
  }

  ionViewWillLeave() {
    this.chart.destroy();
  }
}
