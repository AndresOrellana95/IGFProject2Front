import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { CookieService } from 'ngx-cookie';
import { Subject } from 'rxjs/Rx';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { Usuario, ServicioUsuario } from './../servicios';
declare var Materialize: any;
declare var $: any;

@Component({
  templateUrl: './crear-cuenta.component.html',
  styleUrls: [ './crear-cuenta.component.css' ]
})

export class CrearCuenta implements OnInit {
  usuario: Usuario;
  c: string;
  nc: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicioUsuario: ServicioUsuario,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.usuario = new Usuario;
  }

  crearUsuario() {
    if(this.c == this.nc){
      this.usuario.password = this.nc;
      this.servicioUsuario.crearUsuario(this.usuario).subscribe(
        message => {
          Materialize.toast("Usuario creado", 3000, 'toastSuccess');
          this.router.navigate(['/login/']);
        },
        error => {
          Materialize.toast("Error al realizar operación", 3000, "toastError");
        }
      );
    }
    else
    {
      Materialize.toast("Confirmación fallida de contraseña",3000,"toastError");
    }
  }
}
