import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { DataTablesModule } from 'angular-datatables';
import { CookieModule } from 'ngx-cookie';
import { LoginRoutingModule } from './login-routing.module';
import { Login, CrearCuenta } from './componentes';
import { ServicioAutenticacion, ServicioUsuario } from './servicios';

@NgModule({
  imports:[
    CommonModule,
    HttpModule,
    FormsModule,
    CookieModule.forChild(),
    MaterializeModule,
    DataTablesModule,
    LoginRoutingModule
  ],
  declarations:[
    Login,
    CrearCuenta
  ],
  providers:[
    ServicioAutenticacion,
    ServicioUsuario
  ]
})

export class LoginModule {}
