import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceDetailComponent } from './place-detail.component';
import { Routes, RouterModule } from '@angular/router';

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
    RouterModule.forChild(routes)
  ]
})
export class PlaceDetailModule { }
