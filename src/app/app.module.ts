import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppPrincipal } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import 'materialize-css';
import { CookieModule } from 'ngx-cookie';
import { MaterializeModule } from 'angular2-materialize';
import { DataTablesModule } from 'angular-datatables';
import { candidatoComponent } from './candidatos/candidato.module';
import { evaluacionComponent } from './evaluaciones/evaluacion.module';
import { impuestoComponent } from './impuestos/impuestos.module';
import { LoginModule } from './login/login.module';
import { EmpleadoModule } from './empleados/empleado.module'
import { PlanillaComponent } from './planilla/planilla.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterializeModule,
    candidatoComponent,
    evaluacionComponent,
    impuestoComponent,
    DataTablesModule,
    LoginModule,
    EmpleadoModule,
    PlanillaComponent,
    CookieModule.forRoot()
  ],
  declarations: [
    AppPrincipal
  ],
  providers: [],
  bootstrap: [ AppPrincipal ]
})

export class AppModule { }
