import { Component, Input, OnInit } from '@angular/core';
import { NameLink } from '../../interfaces/type-dto.interface';
import { PokemonService } from '../../pokemon.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon!: NameLink;
  public details$?: Observable<any>;

  constructor(private readonly pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.details$ = this.pokemonService.getPokemonDetail(this.pokemon.url);
  }
}
