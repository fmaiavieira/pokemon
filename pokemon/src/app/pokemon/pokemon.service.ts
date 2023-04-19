import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { urlConfig } from '../config/url.config';
import { PokemonTypeAdapter } from './adpters/pokemon-type.adapter';
import { TypeDto } from './interfaces/type-dto.interface';
import { PokemonTypesAdapter } from './adpters/types.adaptes';
import { TypesDto } from './interfaces/types-dto.interface';
import { ChartConfiguration } from 'chart.js';
import { PokemonAdapter } from './adpters/pokemon.adapter';
import { PokemonDto } from './interfaces/pokemon-dto.interface copy';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private readonly http: HttpClient) {}

  public getPokemonType(
    searchParam: string = 'ground'
  ): Observable<ChartConfiguration<'bar'>['data']> {
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
  ): Observable<any> {
    return this.http.get<any>(urlConfig.pokemons(offset, limit)).pipe();
  }

  public getPokemonDetail(url: string): Observable<any> {
    return this.http.get<PokemonDto>(url).pipe(map(PokemonAdapter.toList));
  }
}
