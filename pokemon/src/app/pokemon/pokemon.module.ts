import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonComponent } from './pokemon.component';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [PokemonComponent],
  imports: [CommonModule, PokemonRoutingModule, MaterialModule],
})
export class PokemonModule {}
