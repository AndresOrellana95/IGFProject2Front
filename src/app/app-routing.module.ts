import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo:'/candidatos',
    pathMatch:'full'
  },
  {
    path:'login',
    redirectTo: '/login',
    pathMatch:'full'
  },
  {
    path: 'candidatos',
    redirectTo: '/candidatos',
    pathMatch: 'full'
  },
  {
    path: 'impuestos',
    redirectTo: '/impuestos',
    pathMatch: 'full'
  },
  {
    path:'empleados',
    redirectTo: '/empleados',
    pathMatch: 'full'
  },
  {
    path: 'evaluaciones',
    redirectTo: '/evaluaciones',
    pathMatch: 'full'
  },
  {
    path: 'reclutamiento',
    redirectTo:'/reclutamiento',
    pathMatch: 'full'
  },
  {
    path:'asistencia',
    redirectTo: '/asistencia',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports:[
    RouterModule
  ],
  declarations: []
})

export class AppRoutingModule { }
