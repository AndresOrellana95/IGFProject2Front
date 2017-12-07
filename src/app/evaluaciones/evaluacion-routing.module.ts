import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { consultarEvaluacion } from './componentes';
import { agregarCandidato , AsignarCandidato } from './componentes';
import { AutenticacionGuard } from './../login'

const routes: Routes = [
  {
    path: 'evaluaciones',
    children: [
      {
        path: '',
        component: consultarEvaluacion
      },
      {
        path:':id',
        component: agregarCandidato,
        canActivate: [AutenticacionGuard],
        data: {politica:"CT0001"}
      },
      {
        path: 'asignar',
        children: [
          {
            path: ':id',
            component: AsignarCandidato,
            canActivate: [AutenticacionGuard],
            data: {politica:"CT0001"}
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[AutenticacionGuard]
})

export class evaluacionRoutingModule { }
