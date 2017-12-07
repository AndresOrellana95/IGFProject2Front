import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Login, CrearCuenta } from './componentes';

const routes: Routes = [
  {
    path: 'login',
    children: [
      {
        path: '',
        component: Login
      },
      {
        path:'crear',
        component: CrearCuenta
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})

export class LoginRoutingModule {}
