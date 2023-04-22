import { Component, Input } from '@angular/core';
import { Stat } from 'src/app/pokemon/interfaces/stat.interface';

@Component({
  selector: 'app-pokemon-stat',
  templateUrl: './pokemon-stat.component.html',
  styleUrls: ['./pokemon-stat.component.scss'],
})
export class PokemonStatComponent {
  @Input() stat!: Stat;
}
