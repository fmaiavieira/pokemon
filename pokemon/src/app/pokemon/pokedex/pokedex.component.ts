import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable, Subject, of } from 'rxjs';
import { PokedexStore } from './pokedex.store';
import {
  distinctUntilChanged,
  pluck,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Pokemon } from '../interfaces/pokemon.interface';
import { NameLink } from '../interfaces/dtos/type-dto.interface';
import { expandAnimation } from '../animations/expand.animation';
import { MatDialog } from '@angular/material/dialog';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { currentViewportObservable } from 'src/app/shared/current-viewport';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
  animations: [expandAnimation],
})
export class PokedexComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  public searchControl = new FormControl();
  public selectedPokemon?: Pokemon;
  public pokemonsOptions: string[] = [];
  public filteredPokemonsOptions$?: Observable<Pokemon>;
  public currentPagePokemons$?: Observable<NameLink[]>;
  public pokemonsLength$?: Observable<number>;

  constructor(
    private readonly pokedexStore: PokedexStore,
    public readonly dialog: MatDialog
  ) {}

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

    currentViewportObservable.currentViewport$
      .pipe(
        switchMap((width) => of(width < 768)),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        value ? this.openDetailsDialog() : this.dialog.closeAll();
      });
  }

  openDetailsDialog() {
    const dialogRef = this.dialog.open(
      PokemonDetailsComponent
    ).componentInstance;
    dialogRef.pokemon = this.selectedPokemon;
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
