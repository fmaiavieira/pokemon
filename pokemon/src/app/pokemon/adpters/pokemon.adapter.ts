import { PokemonDto } from '../interfaces/pokemon-dto.interface copy';
import { TYPE_COLOR } from '../constants/types-color';

export class PokemonAdapter {
  static toList(data: PokemonDto) {
    const [type] = data.types;
    const name = data.name;
    return {
      ...data,
      imgUrl: `assets/pokemons/poke_${data.id}.gif`,
      bgColor: TYPE_COLOR[type.type.name],
      types: data.types.map((slot) => slot.type.name),
      name: name.charAt(0).toUpperCase() + name.slice(1),
    };
  }
}
