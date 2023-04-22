import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { MinWidthDirective } from './directives/min-width.directive';

@NgModule({
  declarations: [MinWidthDirective],
  imports: [CommonModule, MaterialModule],
  exports: [CommonModule, MaterialModule, MinWidthDirective],
})
export class SharedModule {}
