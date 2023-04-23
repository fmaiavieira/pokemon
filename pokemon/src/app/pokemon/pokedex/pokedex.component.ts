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
import { Pokemon } from '../interfaces/pokemon.interface';
import { NameLink } from '../interfaces/dtos/type-dto.interface';
import { expandAnimation } from '../animations/expand.animation';
import { MatDialog } from '@angular/material/dialog';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { CurrentViewport } from 'src/app/shared/current-viewport';

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
    public readonly dialog: MatDialog,
    public readonly currentViewport: CurrentViewport
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

  setSelectedPokemon(pokemon: Pokemon) {
    this.selectedPokemon = pokemon;

    this.currentViewport.currentViewport$
      .pipe(
        takeUntil(this.destroy$),
        switchMap((width) => of(width < 768)),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        value && this.selectedPokemon
          ? this.openDetailsDialog()
          : this.dialog.closeAll();
      });
  }

  openDetailsDialog() {
    this.dialog.closeAll();

    const dialogRef = this.dialog.open(PokemonDetailsComponent, {
      panelClass: 'pokemon-details-dialog',
    });
    dialogRef.componentInstance.pokemon = this.selectedPokemon;
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        if (!value) {
          return;
        }
        this.unselectPokemon();
      });
  }

  unselectPokemon() {
    this.selectedPokemon = undefined;
  }

  pokemonTrackByFn(index: number, item: NameLink) {
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
