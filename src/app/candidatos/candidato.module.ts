import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { DataTablesModule } from 'angular-datatables';
import { NgDatepickerModule } from 'ng2-datepicker'
import { CandidatoRoutingModule } from './candidato-routing.module';
import { aceptarCandidato } from './componentes';
import { enProceso } from './componentes';
import { componenteFinalistas, ContratarCandidato, CalificacionesCandidato } from './componentes';
import { servicioCandidatos } from './servicios';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    MaterializeModule,
    DataTablesModule,
    NgDatepickerModule,
    CandidatoRoutingModule
  ],
  declarations: [
    aceptarCandidato,
    enProceso,
    componenteFinalistas,
    CalificacionesCandidato,
    ContratarCandidato
  ],
  providers: [
    servicioCandidatos
  ]
})

export class candidatoComponent {  }
