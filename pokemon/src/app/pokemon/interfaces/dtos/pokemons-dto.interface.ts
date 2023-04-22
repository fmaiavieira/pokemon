import { NameLink } from './type-dto.interface';

export interface PokemonsDto {
  count: number;
  next: any;
  previous: any;
  results: NameLink[];
}
