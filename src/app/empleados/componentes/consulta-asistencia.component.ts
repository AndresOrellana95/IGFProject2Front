import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { DatepickerOptions } from 'ng2-datepicker';
import { CookieService } from 'ngx-cookie';
import { Subject } from 'rxjs/Rx';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { ServicioAsistencia, Asistencia } from './../servicios';
declare var Materialize: any;
declare var $: any;

@Component({
  templateUrl: './consulta-asistencia.component.html'
})

export class ConsultaAsistencia implements OnInit{
  asistencia: Asistencia;
  asistencias: Asistencia[];
  modalCrear = new EventEmitter<string | MaterializeAction>();

  constructor(
    private servicioAsistencia: ServicioAsistencia,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  abrir() {
    this.modalCrear.emit({action:"modal", params:['open']});
  }

  cerrar() {
    this.modalCrear.emit({action:"modal", params:['close']});
  }

  ngOnInit() {
    this.asistencia = new Asistencia;
    this.asistencias = new Array<Asistencia>();
    this.obtenerAsistencias();
  }

  obtenerAsistencias() {
    this.servicioAsistencia.obtenerAsistencias().subscribe(
      asistencias => {
        this.asistencias = asistencias;
      }
    );
  }

  crearResumenAsistencia() {

  }
}
