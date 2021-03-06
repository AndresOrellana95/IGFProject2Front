import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IngresoAsistencia, RetiroEmpleado, ConsultaAsistencia, NuevaAsistencia } from './componentes'
import { AutenticacionGuard } from './../login'

const routes: Routes = [
  {
    path: 'empleados',
    children: [
      {
        path: 'asistencia',
        component: ConsultaAsistencia
      },
      {
        path:'retiro',
        component: RetiroEmpleado
      },
      {
        path:'ingreso_asistencia',
        children: [
          {
            path:':id',
            component: IngresoAsistencia
          }
        ]
      },
      {
        path:'crear_asistencia',
        component:NuevaAsistencia
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[AutenticacionGuard]
})

export class EmpleadoRoutingModule { }
