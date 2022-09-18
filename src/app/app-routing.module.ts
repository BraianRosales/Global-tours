import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule)
  },
  {
    path: '**',
    redirectTo: 'notFound'
  },
  {
    path: 'notFound',
    loadChildren: () => import('./not-found404/not-found404.module').then((m) => m.NotFound404Module)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
