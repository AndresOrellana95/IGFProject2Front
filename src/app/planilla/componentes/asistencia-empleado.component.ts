import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { CookieService } from 'ngx-cookie';
import { Subject } from 'rxjs/Rx';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { ServicioPlanilla, Asistencia, Empleado } from './../servicios';
declare var Materialize: any;
declare var $: any;

@Component({
  templateUrl: './asistencia-empleado.component.html',
  styleUrls: [ './asistencia-empleado.component.css' ]
})

export class AsistenciaEmpleado implements OnInit{
  asistencia: Asistencia;
  empleado: Empleado;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  modalIngreso = new EventEmitter<string | MaterializeAction>();

  ngOnInit() {
    this.asistencia = new Asistencia;
    this.empleado = new Empleado;
    this.dtOptions = {
      pageLength: 5,
      pagingType: 'simple_numbers',
      lengthMenu: [5,10],
      searching: true,
      ordering: false,
      language: {
        "emptyTable": "Sin registros disponibles en la tabla",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
        "infoEmpty": "",
        "infoFiltered": "(filtrados de _MAX_ totales )",
        "lengthMenu": "Mostrando _MENU_ registros",
        "search": "Buscar:",
        "zeroRecords": "Búsqueda sin resultados",
        "paginate": {
          "first": "Primero",
          "last": "Último",
          "next": "Siguiente",
          "previous": "Anterior"
        }
      }
    };
  }

  abrir() {
    this.modalIngreso.emit({ action: "modal", params:['open'] });
  }

  cerrar() {
    this.modalIngreso.emit({ action: "modal", params:['close'] });
  }

}
