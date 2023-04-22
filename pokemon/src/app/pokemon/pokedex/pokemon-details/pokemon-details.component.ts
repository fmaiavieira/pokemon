import { Component, Inject, Input, OnInit } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { currentViewportObservable } from 'src/app/shared/current-viewport';
import { of } from 'rxjs';
import { switchMap, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent {
  @Input() pokemon?: Pokemon;

  // close() {
  //   this.dialogRef?.close();
  // }
}
