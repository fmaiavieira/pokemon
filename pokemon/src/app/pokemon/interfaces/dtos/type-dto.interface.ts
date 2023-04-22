export interface TypeDto {
  damage_relations: DamageRelations;
  game_indices: GameIndex[];
  generation: NameLink;
  id: number;
  move_damage_class: NameLink;
  moves: NameLink[];
  name: string;
  names: Name[];
  past_damage_relations: any[];
  pokemon: Pokemon[];
}

export interface DamageRelations {
  double_damage_from: NameLink[];
  double_damage_to: NameLink[];
  half_damage_from: NameLink[];
  half_damage_to: NameLink[];
  no_damage_from: NameLink[];
  no_damage_to: NameLink[];
}

export interface NameLink {
  name: string;
  url: string;
}

export interface GameIndex {
  game_index: number;
  generation: NameLink;
}

export interface Name {
  language: NameLink;
  name: string;
}

export interface Pokemon {
  pokemon: NameLink;
  slot: number;
}
