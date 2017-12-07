import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { CookieService } from 'ngx-cookie';
import { Subject } from 'rxjs/Rx';
import { DatepickerOptions } from 'ng2-datepicker';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { ServicioAsistencia, Asistencia, Empleado } from './../servicios';
declare var Materialize: any;

@Component({
  templateUrl: './ingreso-asistencia.component.html',
  styleUrls: [ './ingreso-asistencia.component.css' ]
})

export class IngresoAsistencia implements OnInit{

  ngOnInit() {

  }
}
