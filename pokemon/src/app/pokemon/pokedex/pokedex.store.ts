import { Store } from 'src/app/shared/store';
import { PokemonService } from '../pokemon.service';
import { map, pluck, switchMap, take, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { NameLink } from '../interfaces/type-dto.interface';
import { PageEvent } from '@angular/material/paginator';

interface PokedexStateInterface {
  pokemons: NameLink[];
  activePokemons: NameLink[];
  resultsCount: number;
}

@Injectable()
export class PokedexStore extends Store<PokedexStateInterface> {
  constructor(private readonly pokemonService: PokemonService) {
    super();
  }

  setActivePage(pageIndex: number, pageSize: number) {
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    this.mutate({
      activePokemons: [...this.state.pokemons.slice(start, end)],
    });
  }

  loadData() {
    this.pokemonService
      .getPokemons()
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.mutate({
            pokemons: [...this.state.pokemons, ...res.results],
            resultsCount: res.count,
          });
          this.setActivePage(0, 12);
        },
      });
  }

  protected initialState(): PokedexStateInterface {
    return {
      pokemons: [],
      activePokemons: [],
      resultsCount: 0,
    };
  }
}
