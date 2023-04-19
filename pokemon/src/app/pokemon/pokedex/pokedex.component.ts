import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { PokedexStore } from './pokedex.store';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit, OnDestroy {
  public pokemons$?: Observable<any>;
  public pokemonsLength$?: Observable<number>;
  constructor(private readonly pokedexStore: PokedexStore) {}

  ngOnInit(): void {
    this.pokedexStore.loadData();
    this.pokemons$ = this.pokedexStore.state$.pipe(pluck('activePokemons'));
    this.pokemonsLength$ = this.pokedexStore.state$.pipe(pluck('resultsCount'));
  }

  ngOnDestroy(): void {
    this.pokedexStore.reset();
  }

  searchPage(event: PageEvent): void {
    this.pokedexStore.setActivePage(event.pageIndex, event.pageSize);
  }
}
