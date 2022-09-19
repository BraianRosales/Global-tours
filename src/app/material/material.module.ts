import { NgModule } from '@angular/core';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

const material = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule
]

@NgModule({
  exports: [material]
})
export class MaterialModule { }
