import { NgModule } from '@angular/core';
import { PokemonComponent } from './pokemon.component';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonTypesComponent } from './pokemon-types/pokemon-types.component';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokedexComponent } from './pokedex/pokedex.component';
import { PokemonCardComponent } from './pokedex/pokemon-card/pokemon-card.component';
import { SharedModule } from '../shared/shared.module';
import { PokedexStore } from './pokedex/pokedex.store';
import { PokemonDetailsComponent } from './pokedex/pokemon-details/pokemon-details.component';
import { PokemonStatComponent } from './pokedex/pokemon-details/pokemon-stat/pokemon-stat.component';

@NgModule({
  declarations: [
    PokemonComponent,
    PokemonTypesComponent,
    PokedexComponent,
    PokemonCardComponent,
    PokemonDetailsComponent,
    PokemonStatComponent,
  ],
  imports: [
    PokemonRoutingModule,
    SharedModule,
    NgChartsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [PokedexStore],
})
export class PokemonModule {}
