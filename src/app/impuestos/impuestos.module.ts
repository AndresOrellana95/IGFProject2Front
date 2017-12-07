import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CookieModule } from 'ngx-cookie';
import { MaterializeModule } from 'angular2-materialize';
import { DataTablesModule } from 'angular-datatables';
import { impuestoRoutingModule } from './impuestos-routing.module';
import { gestionImpuesto } from './componentes';
import { servicioImpuesto } from './servicios';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    MaterializeModule,
    DataTablesModule,
    impuestoRoutingModule,
    CookieModule.forChild()
  ],
  declarations: [
    gestionImpuesto
  ],
  providers: [
    servicioImpuesto
  ]
})

export class impuestoComponent {  }
