import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFound404Component } from './not-found404.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: NotFound404Component
  }
]

@NgModule({
  declarations: [
    NotFound404Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class NotFound404Module { }
