import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { DataTablesModule } from 'angular-datatables';
import { evaluacionRoutingModule } from './evaluacion-routing.module';
import { consultarEvaluacion } from './componentes';
import { agregarCandidato, AsignarCandidato } from './componentes';
import { servicioEvaluacion, servicioCandidato } from './servicios';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    MaterializeModule,
    DataTablesModule,
    evaluacionRoutingModule
  ],
  declarations: [
    consultarEvaluacion,
    agregarCandidato,
    AsignarCandidato
  ],
  providers: [
    servicioEvaluacion,
    servicioCandidato
  ]
})

export class evaluacionComponent {  }
