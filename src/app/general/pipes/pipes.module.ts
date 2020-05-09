import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActiveNoActivePipe } from '../shared/pipes/active-no-active.pipe';

@NgModule({
  declarations: [ActiveNoActivePipe],
  imports: [CommonModule],
  exports: [ActiveNoActivePipe]
})
export class PipesModule {}
