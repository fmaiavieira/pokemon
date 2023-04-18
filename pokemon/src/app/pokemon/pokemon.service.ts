import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlConfig } from '../config/url.config';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private readonly http: HttpClient) {}

  public getPokemonTypes(): Observable<any> {
    return this.http.get(urlConfig.pokemonsTypes);
  }
}
