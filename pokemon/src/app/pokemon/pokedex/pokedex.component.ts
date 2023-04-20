import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable, Subject, of } from 'rxjs';
import { PokedexStore } from './pokedex.store';
import { pluck, switchMap, takeUntil, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  public searchControl = new FormControl();
  public selectedPokemon: any;
  public pokemonsOptions: string[] = [];
  public filteredPokemonsOptions$?: Observable<any>;
  public currentPagePokemons$?: Observable<any>;
  public pokemonsLength$?: Observable<number>;

  constructor(private readonly pokedexStore: PokedexStore) {}

  ngOnInit(): void {
    this.setupSearchObserver();
    this.pokedexStore.loadData();
    this.currentPagePokemons$ = this.pokedexStore.state$.pipe(
      pluck('activePokemons')
    );
    this.pokemonsLength$ = this.pokedexStore.state$.pipe(pluck('resultsCount'));
  }

  ngOnDestroy(): void {
    this.pokedexStore.reset();
    this.destroy$.complete();
  }

  searchPage(event: PageEvent): void {
    this.pokedexStore.setActivePage(event.pageIndex, event.pageSize);
  }

  searchPokemon(event?: MatAutocompleteSelectedEvent) {
    this.pokedexStore.filteredByName(event?.option.value);
  }

  setSelectedPokemon(pokemon: any) {
    this.selectedPokemon = pokemon;
  }

  pokemonTrackByFn(index: number, item: any) {
    return item.name;
  }
  private setupSearchObserver(): void {
    this.searchControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        tap((value) => this.pokedexStore.filteredByName(value))
      )
      .subscribe();
  }
}
