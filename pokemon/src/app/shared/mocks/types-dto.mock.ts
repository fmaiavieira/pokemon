import { TypesDto } from '../../pokemon/interfaces/dtos/types-dto.interface';

export const typesDtoMock: TypesDto = {
  count: 20,
  next: 0,
  previous: 0,
  results: [
    { name: 'normal', url: 'https://pokeapi.co/api/v2/type/1/' },
    { name: 'fighting', url: 'https://pokeapi.co/api/v2/type/2/' },
  ],
};
