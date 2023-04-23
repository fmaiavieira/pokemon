import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NameLink } from '../../interfaces/dtos/type-dto.interface';
import { PokemonService } from '../../pokemon.service';
import { Observable } from 'rxjs';
import { Pokemon } from '../../interfaces/pokemon.interface';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon!: NameLink;
  @Input() activePokemon?: Pokemon;
  @Output() onSelect = new EventEmitter<Pokemon>();
  public imageLoading = true;
  public details$?: Observable<Pokemon>;

  constructor(private readonly pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.details$ = this.pokemonService.getPokemonDetail(this.pokemon.url);
  }
}
