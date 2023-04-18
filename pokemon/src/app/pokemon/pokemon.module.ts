import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonComponent } from './pokemon.component';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { MaterialModule } from '../material/material.module';
import { PokemonTypesComponent } from './pokemon-types/pokemon-types.component';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PokemonComponent, PokemonTypesComponent],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    MaterialModule,
    NgChartsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class PokemonModule {}
