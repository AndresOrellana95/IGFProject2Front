import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { CookieService } from 'ngx-cookie';
import { Subject } from 'rxjs/Rx';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { ServicioPlanilla, Empleado, Pago, PagoEmpleado, Asistencia} from './../servicios';
declare var Materialize: any;
declare var $: any;

@Component({
  templateUrl: './detalle-planilla.component.html'
})

export class IngresoAsistencia implements OnInit{

  constructor(

  ) {

  }
  
  ngOnInit() {

  }
}
