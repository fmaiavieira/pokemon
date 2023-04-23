import { TestBed } from '@angular/core/testing';
import { PokemonService } from './pokemon.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { typeDtoMock } from '../shared/mocks/type-dto.mock';
import { typesDtoMock } from '../shared/mocks/types-dto.mock';
import { PokemonTypeAdapter } from './adpters/pokemon-type.adapter';
import { PokemonTypesAdapter } from './adpters/types.adaptes';
import { pokemonsDtoMock } from '../shared/mocks/pokemons-dto.mock';
import { pokemonDtoMock } from '../shared/mocks/pokemon-dto.mock';
import { PokemonAdapter } from './adpters/pokemon.adapter';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: HttpClient,
          useValue: jasmine.createSpyObj<HttpClient>('HttpClient', [
            'get',
            'post',
          ]),
        },
      ],
    });
    service = TestBed.inject(PokemonService);
    httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getPokemonTypeChart should get type values', () => {
    httpSpy.get.and.returnValue(of(typeDtoMock));
    const expectation = PokemonTypeAdapter.toChart(
      typeDtoMock.damage_relations
    );
    service.getPokemonTypeChart().subscribe((result) => {
      expect(result).toEqual(expectation);
    });
  });

  it('#getAllPokemonTypes should get all types values', () => {
    httpSpy.get.and.returnValue(of(typesDtoMock));
    const expectation = PokemonTypesAdapter.toAutocomplete(typesDtoMock);

    service.getAllPokemonTypes().subscribe((result) => {
      expect(result).toEqual(expectation);
    });
  });

  it('#getPokemons should get all pokemons ', () => {
    httpSpy.get.and.returnValue(of(pokemonsDtoMock));

    service.getPokemons().subscribe((result) => {
      expect(result).toEqual(pokemonsDtoMock);
    });
  });

  it('#getPokemonDetail should get pokemon details ', () => {
    httpSpy.get.and.returnValue(of(pokemonDtoMock));
    const expectation = PokemonAdapter.toList(pokemonDtoMock);

    service.getPokemonDetail('fakeurl').subscribe((result) => {
      expect(result).toEqual(expectation);
    });
  });
});
