import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CookieModule } from 'ngx-cookie';
import { MaterializeModule } from 'angular2-materialize';
import { DataTablesModule } from 'angular-datatables';
import { NgDatepickerModule } from 'ng2-datepicker'
import { PlanillaRoutingModule } from './planilla-routing.module';
import { ServicioPlanilla } from './servicios';
import { AsistenciaEmpleado, ResumenMensual, Ausencia, CrearPlanilla, ConsultaPlanilla } from './componentes';
import { ModificacionPlanilla, CrearPrestamo, DetallePlanilla, IngresoAsistencia } from './componentes'

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    MaterializeModule,
    DataTablesModule,
    NgDatepickerModule,
    CookieModule.forChild(),
    PlanillaRoutingModule
  ],
  declarations: [
    AsistenciaEmpleado,
    ResumenMensual,
    Ausencia,
    CrearPlanilla,
    ConsultaPlanilla,
    ModificacionPlanilla,
    CrearPrestamo,
    DetallePlanilla,
    IngresoAsistencia
  ],
  providers: [
    ServicioPlanilla
  ]
})

export class PlanillaComponent {}
