import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonCardComponent } from './pokemon-card.component';
import { PokemonService } from '../../pokemon.service';
import { of } from 'rxjs';
import { pokemonDtoMock } from 'src/app/shared/mocks/pokemon-dto.mock';
import { pokemonsDtoMock } from 'src/app/shared/mocks/pokemons-dto.mock';

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonCardComponent],
      providers: [
        {
          provide: PokemonService,
          useValue: jasmine.createSpyObj<PokemonService>('PokemonService', {
            getAllPokemonTypes: of(),
            getPokemonTypeChart: of(),
            getPokemonDetail: of(pokemonDtoMock),
          }),
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    component.pokemon = pokemonsDtoMock.results[0];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
