import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceDetailComponent } from './place-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: PlaceDetailComponent
  }
]

@NgModule({
  declarations: [
    PlaceDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class PlaceDetailModule { }
