import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { CookieService } from 'ngx-cookie';
import { Subject } from 'rxjs/Rx';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { Usuario, ServicioAutenticacion } from './../servicios';
declare var Materialize: any;
declare var $: any;

@Component({
  templateUrl: './iniciar.component.html',
  styleUrls: [ './iniciar.component.css' ]
})

export class Login implements OnInit{
  usuarioTemp: any = {};
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: ServicioAutenticacion,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/evaluaciones';
  }

  iniciarSesion() {
    this.authService.iniciarSesion(this.usuarioTemp.correo, this.usuarioTemp.contra).subscribe(
      r => {
        this.cookieService.put('token', r['token']);
        this.cookieService.putObject('usuario', r['usuario']);
        window.location.href = '.' + this.returnUrl;
      },
      error => {
        if (error.status === 404) {
          Materialize.toast("Usuario no encontrado",3000,"toastError");
        }
        if (error.status === 400) {
          Materialize.toast("Contraseña incorrecta",3000,"toastError");
        }
      }
    );
  }
}
