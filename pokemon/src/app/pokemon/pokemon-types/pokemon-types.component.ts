import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { PokemonService } from '../pokemon.service';
import { Observable, of } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-types',
  templateUrl: './pokemon-types.component.html',
  styleUrls: ['./pokemon-types.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonTypesComponent implements OnInit, AfterViewInit {
  public searchControl = new FormControl('');
  public typeOptions$ = this.pokemonService.getAllPokemonTypes();
  public filteredTypeOptions$: Observable<string[]> = of([]);
  public barChartLegend = false;
  public barChartPlugins = [];
  public barChartData$ = this.pokemonService.getPokemonType();
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      title: {
        text: `Eficiência de dano do tipo ${this.searchControl.value}`,
        display: true,
      },
    },
  };

  constructor(private readonly pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.filteredTypeOptions$ = this.searchControl.valueChanges.pipe(
      switchMap(() => this.typeOptions$),
      map((value) =>
        value.filter((type) => type.includes(this.searchControl.value))
      )
    );
    this.search();
  }

  ngAfterViewInit() {}

  search(event?: MatAutocompleteSelectedEvent | any) {
    this.barChartData$ = this.pokemonService.getPokemonType(
      event?.option.value
    );
  }
}
