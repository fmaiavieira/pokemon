import { ChartConfiguration } from 'chart.js';
import { DAMAGE } from '../constants/damages';
import { TYPE_COLOR } from '../constants/types-color';
import {
  DamageRelations,
  NameLink,
} from '../interfaces/dtos/type-dto.interface';
import { BarChart } from '../interfaces/bar-chart.interface';

export class PokemonTypeAdapter {
  static toChart(data: DamageRelations): BarChart {
    const barChartOptions: ChartConfiguration<'bar'>['options'] = {
      plugins: {
        title: {
          text: `Eficiência de dano do tipo`,
          display: true,
          font: {
            size: 18,
          },
        },
        legend: {
          display: true,
        },
      },
      scales: {
        y: {
          suggestedMax: 2.5,
        },
      },
      maintainAspectRatio: true,
    };
    let labels: string[] = [];
    let dataset: any = {
      data: [],
      label: 'Eficiência do dano',
      backgroundColor: [],
      hoverBackgroundColor: [],
      minBarLength: 10,
    };

    Object.entries(data).forEach(([key, value]) => {
      if (!key.includes('to')) {
        return;
      }
      value.forEach((value: NameLink) => {
        labels.push(value.name);
        dataset.data.push(DAMAGE[key]);
        dataset.backgroundColor!.push(TYPE_COLOR[value.name]);
        dataset.hoverBackgroundColor!.push(`${TYPE_COLOR[value.name]}bb`);
      });
    });

    const barChartData = {
      labels,
      datasets: [dataset],
    };

    return {
      barChartOptions,
      barChartData,
    };
  }
}
