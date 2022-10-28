import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [MaterialModule, CommonModule],
  exports: [MaterialModule, SpinnerComponent],
  providers: [],
})
export class SharedModule {}
