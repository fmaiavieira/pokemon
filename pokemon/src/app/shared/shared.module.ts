import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { MinWidthDirective } from './directives/min-width.directive';
import { GetCurrentHeightDirective } from './directives/get-current-height.directive';

@NgModule({
  declarations: [MinWidthDirective, GetCurrentHeightDirective],
  imports: [CommonModule, MaterialModule],
  exports: [
    CommonModule,
    MaterialModule,
    MinWidthDirective,
    GetCurrentHeightDirective,
  ],
})
export class SharedModule {}
