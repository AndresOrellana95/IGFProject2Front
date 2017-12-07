import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { DataTablesModule } from 'angular-datatables';
import { NgDatepickerModule } from 'ng2-datepicker'
import { EmpleadoRoutingModule } from './empleado-routing.module';
import { ServicioAsistencia, ServicioEmpleado } from './servicios';
import { IngresoAsistencia, RetiroEmpleado } from './componentes';


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    MaterializeModule,
    DataTablesModule,
    NgDatepickerModule,
    EmpleadoRoutingModule
  ],
  declarations: [
    IngresoAsistencia,
    RetiroEmpleado
  ],
  providers: [
    ServicioAsistencia,
    ServicioEmpleado
  ]
})

export class EmpleadoModule {  }
