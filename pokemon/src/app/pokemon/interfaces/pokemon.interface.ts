import { Stat } from './stat.interface';
import { Type } from './type.interface';

export interface Pokemon {
  imgUrl: string;
  bgColor: string;
  types: Type[];
  name: string;
  id: string;
  stats: Stat[];
  abilities: string[];
  height: string;
  weight: string;
}
