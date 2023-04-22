import { Store } from 'src/app/shared/store';
import { PokemonService } from '../pokemon.service';
import { take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { NameLink } from '../interfaces/dtos/type-dto.interface';

interface PokedexStateInterface {
  pokemons: NameLink[];
  filteredPokemons: NameLink[];
  activePokemons: NameLink[];
  resultsCount: number;
}

@Injectable()
export class PokedexStore extends Store<PokedexStateInterface> {
  private currentStart: number = 0;
  private currentEnd: number = 12;
  constructor(private readonly pokemonService: PokemonService) {
    super();
  }

  setActivePage(pageIndex: number, pageSize: number) {
    this.currentStart = pageIndex * pageSize;
    this.currentEnd = this.currentStart + pageSize;
    this.mutate({
      activePokemons: [
        ...this.state.filteredPokemons.slice(
          this.currentStart,
          this.currentEnd
        ),
      ],
    });
  }

  filteredByName(name: string) {
    const filtered = this.state.pokemons.filter((pokemon) =>
      pokemon.name.includes(name)
    );
    this.mutate({
      filteredPokemons: [...filtered],
      activePokemons: [...filtered.slice(this.currentStart, this.currentEnd)],
      resultsCount: filtered.length,
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
            filteredPokemons: [...this.state.pokemons, ...res.results],
            resultsCount: res.count,
          });
          this.setActivePage(0, 12);
        },
      });
  }

  protected initialState(): PokedexStateInterface {
    return {
      pokemons: [],
      filteredPokemons: [],
      activePokemons: [],
      resultsCount: 0,
    };
  }
}
