import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { PokemonService } from '../pokemon.service';
import { Observable, Subject, of } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-types',
  templateUrl: './pokemon-types.component.html',
  styleUrls: ['./pokemon-types.component.scss'],
})
export class PokemonTypesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  public searchControl = new FormControl('ground');
  public typeOptions: string[] = [];
  public filteredTypeOptions$: Observable<string[]> = of([]);

  public barChart$ = this.pokemonService.getPokemonTypeChart();

  constructor(private readonly pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getAutocompleteOptions();
    this.search();
  }

  ngOnDestroy() {
    this.destroy$.complete();
  }

  search(event?: MatAutocompleteSelectedEvent) {
    this.barChart$ = this.pokemonService.getPokemonTypeChart(
      event?.option.value
    );
  }

  private getAutocompleteOptions(): void {
    this.pokemonService
      .getAllPokemonTypes()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (options) => {
          this.typeOptions = options;
          this.setupAutocompleteObserver();
        },
      });
  }

  private setupAutocompleteObserver(): void {
    this.filteredTypeOptions$ = this.searchControl.valueChanges.pipe(
      switchMap(() =>
        of(
          this.typeOptions.filter((type) =>
            type.includes(this.searchControl.value)
          )
        )
      )
    );
  }
}
