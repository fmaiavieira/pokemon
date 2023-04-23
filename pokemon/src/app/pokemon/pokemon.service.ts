import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { urlConfig } from '../config/url.config';
import { PokemonTypeAdapter } from './adpters/pokemon-type.adapter';
import { TypeDto } from './interfaces/dtos/type-dto.interface';
import { PokemonTypesAdapter } from './adpters/types.adaptes';
import { TypesDto } from './interfaces/dtos/types-dto.interface';
import { PokemonAdapter } from './adpters/pokemon.adapter';
import { PokemonDto } from './interfaces/dtos/pokemon-dto.interface';
import { PokemonsDto } from './interfaces/dtos/pokemons-dto.interface';
import { BarChart } from './interfaces/bar-chart.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private readonly http: HttpClient) {}

  public getPokemonTypeChart(
    searchParam: string = 'ground'
  ): Observable<BarChart> {
    return this.http
      .get<TypeDto>(urlConfig.pokemonType(searchParam))
      .pipe(pluck('damage_relations'), map(PokemonTypeAdapter.toChart));
  }

  public getAllPokemonTypes(): Observable<string[]> {
    return this.http
      .get<TypesDto>(urlConfig.allPokemonsTypes)
      .pipe(map(PokemonTypesAdapter.toAutocomplete));
  }

  public getPokemons(
    offset: number = 0,
    limit: number = 100000
  ): Observable<PokemonsDto> {
    return this.http.get<PokemonsDto>(urlConfig.pokemons(offset, limit));
  }

  public getPokemonDetail(url: string): Observable<any> {
    return this.http.get<PokemonDto>(url).pipe(map(PokemonAdapter.toList));
  }
}
