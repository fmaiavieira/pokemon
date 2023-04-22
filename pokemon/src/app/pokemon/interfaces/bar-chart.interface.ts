import { ChartConfiguration } from 'chart.js';

export interface BarChart {
  barChartData: ChartConfiguration<'bar'>['data'];
  barChartOptions: ChartConfiguration<'bar'>['options'];
}
