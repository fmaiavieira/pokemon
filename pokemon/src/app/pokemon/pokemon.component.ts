import { Component, OnInit } from '@angular/core';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit {
  pokemonsTypes$ = this.pokemonService.getPokemonTypes();

  constructor(private readonly pokemonService: PokemonService) {}

  ngOnInit(): void {}
}
