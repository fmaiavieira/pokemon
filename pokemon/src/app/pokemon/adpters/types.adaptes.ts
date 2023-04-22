import { TypesDto } from '../interfaces/dtos/types-dto.interface';

export class PokemonTypesAdapter {
  static toAutocomplete(data: TypesDto): string[] {
    return data.results.map((type) => type.name);
  }
}
