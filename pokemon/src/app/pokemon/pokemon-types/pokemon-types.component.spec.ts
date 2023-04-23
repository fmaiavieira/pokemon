import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonTypesComponent } from './pokemon-types.component';
import { PokemonService } from '../pokemon.service';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { of } from 'rxjs';
import { typesDtoMock } from 'src/app/shared/mocks/types-dto.mock';
import { PokemonTypesAdapter } from '../adpters/types.adaptes';

describe('PokemonTypesComponent', () => {
  let component: PokemonTypesComponent;
  let fixture: ComponentFixture<PokemonTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonTypesComponent, MatAutocomplete],
      providers: [
        {
          provide: PokemonService,
          useValue: jasmine.createSpyObj<PokemonService>('PokemonService', {
            getAllPokemonTypes: of(
              PokemonTypesAdapter.toAutocomplete(typesDtoMock)
            ),
            getPokemonTypeChart: of(),
          }),
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#search should get chart', () => {
    component.search('term');

    expect(
      component['pokemonService'].getPokemonTypeChart
    ).toHaveBeenCalledWith('term');
  });

  it('#updateChartHeight should change property chart height', () => {
    expect(component.chartheight).toBeUndefined();
    component.updateChartHeight(10);
    const result = `${10 + 5}vh`;
    expect(component.chartheight).toEqual(result);
  });

  it('#getAutocompleteOptions should set typeOptions and call #setupAutocompleteObserver ', () => {
    const expectTypes = PokemonTypesAdapter.toAutocomplete(typesDtoMock);
    const spySetupAutocompleteObserver = spyOn<any>(
      component,
      'setupAutocompleteObserver'
    );
    component['getAutocompleteOptions']();
    expect(component.typeOptions).toEqual(expectTypes);
    expect(spySetupAutocompleteObserver).toHaveBeenCalled();
  });

  it('#setupAutocompleteObserver should set filteredTypeOption$', () => {
    const expectTypes = PokemonTypesAdapter.toAutocomplete(typesDtoMock);
    component['getAutocompleteOptions']();
    component['setupAutocompleteObserver']();
    component.searchControl.patchValue('');
    fixture.detectChanges();
    let result: string[];
    component.filteredTypeOptions$.subscribe((value) => {
      result = value;
      expect(value).toEqual(expectTypes);
      expect(result).toEqual(expectTypes);
    });
  });
});
