import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { aceptarCandidato } from './componentes';
import { enProceso } from './componentes'
import { componenteFinalistas, ContratarCandidato, CalificacionesCandidato } from './componentes'
import { AutenticacionGuard } from './../login'

const routes: Routes = [
  {
    path: 'candidatos',
    children: [
      {
        path: '',
        component: aceptarCandidato,
        canActivate: [AutenticacionGuard],
        data:{politica:"CT0001"}
      },
      {
        path:'reclutamiento',
        component: enProceso
      },
      {
        path:'calificaciones',
        component: CalificacionesCandidato
      },
      {
        path:'finalistas',
        component: componenteFinalistas
      },
      {
        path:'contratar',
        children: [
          {
            path:':id',
            component: ContratarCandidato
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

export class CandidatoRoutingModule { }
