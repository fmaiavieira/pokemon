import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { MinWidthDirective } from './directives/min-width.directive';
import { GetCurrentVhHeightDirective } from './directives/get-current-vh-height.directive';

@NgModule({
  declarations: [MinWidthDirective, GetCurrentVhHeightDirective],
  imports: [CommonModule, MaterialModule],
  exports: [
    CommonModule,
    MaterialModule,
    MinWidthDirective,
    GetCurrentVhHeightDirective,
  ],
})
export class SharedModule {}
