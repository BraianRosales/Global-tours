import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PlacesComponent } from './components/places/places.component';
import { PlaceCardComponent } from './components/place-card/place-card.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'lugar/:id',
    loadChildren: () => import('../place-detail/place-detail.module').then(m => m.PlaceDetailModule)
  }
]

@NgModule({
  declarations: [
    HomeComponent,
    PlacesComponent,
    PlaceCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class HomeModule { }
