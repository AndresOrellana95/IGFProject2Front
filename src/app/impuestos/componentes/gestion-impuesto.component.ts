import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { CookieService } from 'ngx-cookie';
import { Subject } from 'rxjs/Rx';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { Impuesto, detalleImpuesto, servicioImpuesto } from './../servicios';
declare var Materialize: any;
declare var $: any;

@Component({
  templateUrl: './gestion-impuesto.component.html',
  styleUrls: [ './gestion-impuesto.component.css' ]
})

export class gestionImpuesto implements OnInit {
  impuesto: Impuesto;
  impuestos: Impuesto[];
  codigos: string[];
  codigo: string;
  nombre: string;
  message: "No hay registros";
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  modalIngreso = new EventEmitter<string | MaterializeAction>();
  modalConfirmacion = new EventEmitter<string | MaterializeAction>();

  constructor(private servicioImpuesto: servicioImpuesto,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService
  ) {
    // Opciones de datatable
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

  open() {
    this.modalIngreso.emit({ action: "modal", params: ['open'] });
  }
  close() {
    this.modalIngreso.emit({ action: "modal", params: ['close'] });
  }

  cerrarConfirmacion(){
    this.modalConfirmacion.emit({ action:"modal", params:['close'] });
  }

  abrirConfirmacion(impuesto: Impuesto){
    this.nombre = impuesto.name;
    this.impuesto = impuesto;
    this.modalConfirmacion.emit({ action:"modal", params:['open'] })
  }

  ngOnInit() {
    this.impuesto = new Impuesto;
    this.llenarTabla();
  }
  llenarTabla(){
    this.codigos = new Array<string>();
    this.servicioImpuesto.obtenerTodos().subscribe(
      impuestos => {
        this.impuestos = impuestos;
        this.dtTrigger.next();
      }
    );
  }

  redireccionar(){
    location.reload();
  }

  crearImpuesto() {
    this.servicioImpuesto.crearImpuesto(this.impuesto).subscribe(
      message => {
        Materialize.toast("Impuesto creado", 3000, 'toastSuccess');
        this.redireccionar();
      },
      error => {
        if(error.status == 422)
        {
            Materialize.toast("El impuesto ya existe", 3000, "toastError");
        }
      }
    );
    this.close();
  }

  eliminar(){
    this.cerrarConfirmacion();
    this.servicioImpuesto.eliminar(this.impuesto).subscribe(
      message => {
        let i = this.impuestos.indexOf(this.impuesto);
        if(i > -1){
          this.impuestos.splice(i, 1);
        }
        Materialize.toast("Impuesto eliminado", 3000, "toastSuccess");
        this.redireccionar();
      },
      error => {
        Materialize.toast("Error al eliminar impuesto", 3000, "toastError");
      }
    );
  }
}
