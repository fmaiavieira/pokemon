import { ChartConfiguration } from 'chart.js';
import { DAMAGE } from '../constants/damages';
import { TYPE_COLOR } from '../constants/types-color';
import { DamageRelations } from '../interfaces/type-dto.interface';

export class PokemonTypeAdapter {
  static toChart(data: DamageRelations): ChartConfiguration<'bar'>['data'] {
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
      value.forEach((value: any) => {
        labels.push(value.name);
        dataset.data.push(DAMAGE[key]);
        dataset.backgroundColor.push(TYPE_COLOR[value.name]);
        dataset.hoverBackgroundColor.push(`${TYPE_COLOR[value.name]}bb`);
      });
    });

    const chartData = {
      labels,
      datasets: [dataset],
    };

    return chartData;
  }
}
