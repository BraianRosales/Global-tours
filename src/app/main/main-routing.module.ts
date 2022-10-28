import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { MainComponent } from './main.component';

/**
 *  Es importante el redirectTo, porque por default entra en un path vacío y eso
 *  me redirije el componente main solo, sin sus rutas hijas.
 */
const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path: 'carrito',
        loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule)
      },
      {
        path: '**',
        redirectTo: 'inicio',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
