import { PokemonDto } from '../interfaces/dtos/pokemon-dto.interface';
import { TYPE_COLOR } from '../constants/types-color';
import { STAT_COLOR } from '../constants/stat-color';
import { Pokemon } from '../interfaces/pokemon.interface';

export class PokemonAdapter {
  static toList(data: PokemonDto): Pokemon {
    const [type] = data.types;
    const name = data.name;
    const types = data.types.map((slot) => {
      return { name: slot.type.name, bgColor: TYPE_COLOR[slot.type.name] };
    });
    const abilities = data.abilities.map((ability) => {
      return ability.ability.name;
    });

    const stats = data.stats.map((stat) => {
      return {
        name: stat.stat.name,
        value: stat.base_stat,
        color: STAT_COLOR[stat.stat.name],
      };
    });

    return {
      imgUrl: data.sprites.other['official-artwork'].front_default,
      bgColor: TYPE_COLOR[type.type.name],
      types,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      id: `#${data.id}`,
      stats,
      abilities,
      height: `${data.height * 10}cm`,
      weight: `${data.weight / 10}kg`,
    };
  }
}
