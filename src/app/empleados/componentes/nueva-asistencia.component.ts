import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { DatepickerOptions } from 'ng2-datepicker';
import { CookieService } from 'ngx-cookie';
import { Subject } from 'rxjs/Rx';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { ServicioAsistencia, ServicioEmpleado, TipoSalario, Asistencia } from './../servicios';
declare var Materialize: any;
declare var $: any;

@Component({
  templateUrl: './nueva-asistencia.component.html'
})

export class NuevaAsistencia implements OnInit{
  asistencia: Asistencia;
  tipoSalario: TipoSalario;
  tiposSalario: TipoSalario[];
  fecha: Date;

  constructor(
    private route: ActivatedRoute,
    private servicioEmpleado: ServicioEmpleado,
    private servicioAsistencia: ServicioAsistencia,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.tipoSalario = new TipoSalario;
    this.tiposSalario = new Array<TipoSalario>();
    this.asistencia = new Asistencia;
    this.obtenerTipoSalario();
  }

  obtenerTipoSalario() {
    this.servicioEmpleado.obtenerTipoSalario().subscribe(
      tipos => {
        this.tiposSalario = tipos;
      }
    );
  }

  crearResumen() {
    var m = (new Date(this.fecha)).getMonth() + 1;
    var y = (new Date(this.fecha)).getFullYear();
    this.asistencia.year = y;
    this.asistencia.month = m;
    this.servicioAsistencia.crearResumen(this.asistencia).subscribe(
      message => {
        Materialize.toast("Asistencia creada", 3000, 'toastSuccess');
        this.router.navigate(['/empleados/asistencia']);
      },
      error => {
        Materialize.toast("Error al realizar la operación", 3000, "toastSuccess");
      }
    );
  }

}
