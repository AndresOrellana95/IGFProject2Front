import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AsistenciaEmpleado, ResumenMensual, Ausencia, CrearPlanilla, ConsultaPlanilla } from './componentes'
import { ModificacionPlanilla, CrearPrestamo, DetallePlanilla, IngresoAsistencia } from './componentes'

const routes: Routes = [
  {
    path: 'asistencia',
    children: [
      {
        path:'resumen',
        component: ResumenMensual
      },
      {
        path: '',
        component: AsistenciaEmpleado
      },
      {
        path:'ausencia',
        component: Ausencia
      },
      {
        path:'ingreso',
        children: [
          {
            path:'',
            component: IngresoAsistencia
          }
        ]
      }
    ]
  },
  {
    path:'planilla',
    children: [
      {
        path:'crear',
        component: CrearPlanilla
      },
      {
        path: '',
        component: ConsultaPlanilla
      },
      {
        path:'modificacion',
        component: ModificacionPlanilla
      },
      {
        path:':id',
        component: DetallePlanilla
      }
    ]
  },
  {
    path:'prestamo',
    children: [
      {
        path:'',
        component: CrearPrestamo
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PlanillaRoutingModule { }
