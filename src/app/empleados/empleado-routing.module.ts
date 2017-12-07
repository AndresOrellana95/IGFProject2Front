import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IngresoAsistencia, RetiroEmpleado } from './componentes'
import { AutenticacionGuard } from './../login'

const routes: Routes = [
  {
    path: 'empleados',
    children: [
      {
        path: 'asistencia',
        component: IngresoAsistencia
      },
      {
        path:'retiro',
        component: RetiroEmpleado
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
