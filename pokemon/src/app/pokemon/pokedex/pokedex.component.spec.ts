import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokedexComponent } from './pokedex.component';
import { PokedexStore } from './pokedex.store';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, of } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { pokemonMock } from 'src/app/shared/mocks/pokemon.mock';
import { CurrentViewport } from 'src/app/shared/current-viewport';

describe('PokedexComponent', () => {
  let component: PokedexComponent;
  let fixture: ComponentFixture<PokedexComponent>;
  let store: PokedexStore;
  let spyDialogRef: any;
  let currentWidth = new BehaviorSubject(1000);

  spyDialogRef = jasmine.createSpy();
  spyDialogRef.componentInstance = { pokemon: {} };
  spyDialogRef.afterClosed = () => of(true);

  const spyMatDialog = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);
  spyMatDialog.open.and.returnValue(spyDialogRef);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokedexComponent],
      providers: [
        {
          provide: PokedexStore,
          useValue: jasmine.createSpyObj<PokedexStore>(
            'PokedexStore',
            ['setActivePage', 'filteredByName', 'loadData', 'reset'],
            { state$: of() }
          ),
        },
        {
          provide: MatDialog,
          useValue: spyMatDialog,
        },
        {
          provide: CurrentViewport,
          useValue: jasmine.createSpyObj<CurrentViewport>(
            'CurrentViewport',
            {},
            {
              currentViewport: currentWidth.getValue(),
              currentViewport$: currentWidth,
            }
          ),
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokedexComponent);
    store = TestBed.inject(PokedexStore) as jasmine.SpyObj<PokedexStore>;
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit should init propertys', () => {
    const spySetupSearchObserver = spyOn<any>(component, 'setupSearchObserver');
    component.ngOnInit();
    expect(spySetupSearchObserver).toHaveBeenCalled();
    expect(store.loadData).toHaveBeenCalled();
    expect(component.currentPagePokemons$).toBeTruthy();
    expect(component.pokemonsLength$).toBeTruthy();
  });

  it('#ngOnDestroy should complete destroy and reset store', () => {
    let completed: boolean = false;

    component['destroy$'].subscribe({
      complete: () => {
        completed = true;
      },
    });
    component.ngOnDestroy();
    expect(store.reset).toHaveBeenCalled();
    expect(completed).toBeTrue();
  });

  it('#searchPage should call store #setActivePage', () => {
    const event: PageEvent = {
      pageIndex: 1,
      pageSize: 0,
      length: 0,
    };
    component.searchPage(event);
    expect(store.setActivePage).toHaveBeenCalled();
  });

  it('#setSelectedPokemon should set current pokemon', () => {
    const spy = spyOn(component, 'setSelectedPokemon');

    component.setSelectedPokemon(pokemonMock);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(pokemonMock);
  });

  it('#setSelectedPokemon should call #openDetailsDialog when width > 768', () => {
    currentWidth.next(700);
    const spy = spyOn(component, 'openDetailsDialog');
    component.setSelectedPokemon(pokemonMock);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('#openDetailsDialog should open details as dialog', () => {
    const unselectSpy = spyOn(component, 'unselectPokemon');
    spyDialogRef.afterClosed = () => of(true);
    component.openDetailsDialog();

    expect(component.dialog.open).toHaveBeenCalled();
    expect(unselectSpy).toHaveBeenCalled();
  });

  it('should not call unselectPokemon when after closed is false', () => {
    const unselectSpy = spyOn(component, 'unselectPokemon');
    spyDialogRef.afterClosed = () => of(false);
    component.openDetailsDialog();

    expect(unselectSpy).not.toHaveBeenCalled();
  });

  it('#unselectPokemon should remove current pokemon', () => {
    component.selectedPokemon = pokemonMock;
    fixture.detectChanges();

    expect(component.selectedPokemon).toEqual(pokemonMock);

    component.unselectPokemon();
    fixture.detectChanges();

    expect(component.selectedPokemon).toBeUndefined();
  });

  it('#pokemonTrackByFn should return name', () => {
    const result = component.pokemonTrackByFn(1, { name: 'pokemon', url: '' });

    expect(result).toEqual('pokemon');
  });
});
