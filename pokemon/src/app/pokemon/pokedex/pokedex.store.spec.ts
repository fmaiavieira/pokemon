import { TestBed } from '@angular/core/testing';
import { PokedexStore } from './pokedex.store';
import { of } from 'rxjs';
import { PokemonService } from '../pokemon.service';
import { PokemonTypesAdapter } from '../adpters/types.adaptes';
import { typesDtoMock } from 'src/app/shared/mocks/types-dto.mock';
import { pokemonsDtoMock } from 'src/app/shared/mocks/pokemons-dto.mock';

describe('PokedexStore', () => {
  let store: PokedexStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: PokemonService,
          useValue: jasmine.createSpyObj<PokemonService>('PokemonService', {
            getAllPokemonTypes: of(
              PokemonTypesAdapter.toAutocomplete(typesDtoMock)
            ),
            getPokemonTypeChart: of(),
            getPokemons: of(pokemonsDtoMock),
          }),
        },
        PokedexStore,
      ],
    });
    store = TestBed.inject(PokedexStore);
  });

  it('should create', () => {
    expect(store).toBeTruthy();
  });

  it('#setActivePage should set start and end and call mutate', () => {
    const mutateSpy = spyOn(store, 'mutate');
    store.setActivePage(1, 10);

    const expectedStart = 10;
    const expectedEnd = 20;
    expect(store['currentStart']).toEqual(expectedStart);
    expect(store['currentEnd']).toEqual(expectedEnd);
    expect(mutateSpy).toHaveBeenCalled();
  });

  it('#filteredByName should mutate filtered', () => {
    store.mutate({
      pokemons: [...pokemonsDtoMock.results],
    });
    expect(store.state.pokemons).toEqual(pokemonsDtoMock.results);
    expect(store.state.filteredPokemons).toEqual([]);

    store.filteredByName('bulbasaur');
    expect(store.state.filteredPokemons[0]).toEqual(pokemonsDtoMock.results[0]);
  });

  it('#loadData should get all', () => {
    const mutateSpy = spyOn(store, 'mutate');
    const setActivePageSpy = spyOn(store, 'setActivePage');

    store.loadData();
    expect(store['pokemonService'].getPokemons).toHaveBeenCalled();
    expect(mutateSpy).toHaveBeenCalled();
    expect(setActivePageSpy).toHaveBeenCalled();
  });
});
