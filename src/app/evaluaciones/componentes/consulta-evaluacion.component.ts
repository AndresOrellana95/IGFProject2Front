import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { CookieService } from 'ngx-cookie';
import { Subject } from 'rxjs/Rx';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { Evaluacion, servicioEvaluacion } from './../servicios';
declare var Materialize: any;

@Component({
  templateUrl: './consulta-evaluacion.component.html',
  styleUrls: [ './consulta-evaluacion.component.css' ]
})

export class consultarEvaluacion implements OnInit {
  evaluacion: Evaluacion;
  evaluaciones: Evaluacion[];
  nombre: string;
  message: "No hay registros";
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  modalIngresoEvaluacion = new EventEmitter<string | MaterializeAction>();
  modalConfirmacionEvaluacion = new EventEmitter<string | MaterializeAction>();
  modalConfirmacionActualizar = new EventEmitter<string | MaterializeAction>();

  constructor(private servicioEvaluacion: servicioEvaluacion,
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
    this.modalIngresoEvaluacion.emit({ action: "modal", params: ['open'] });
  }

  close() {
    this.modalIngresoEvaluacion.emit({ action: "modal", params: ['close'] });
  }

  abrirConfirmacionActualizar(evaluacion: Evaluacion) {
    this.nombre = evaluacion.name;
    this.evaluacion = evaluacion;
    this.modalConfirmacionActualizar.emit({ action:"modal", params:['open'] });
  }

  cerrarConfirmacionActualizar() {
    this.modalConfirmacionActualizar.emit({ action:"modal", params:['close']});
  }

  abrirConfirmacionEliminar(evaluacion: Evaluacion){
    this.nombre = evaluacion.name;
    this.evaluacion = evaluacion;
    this.modalConfirmacionEvaluacion.emit({ action:"modal", params:['open'] })
  }

  cerrarConfirmacionEliminar(){
    this.modalConfirmacionEvaluacion.emit({ action:"modal", params:['close'] });
  }

  ngOnInit() {
    this.evaluacion = new Evaluacion;
    this.llenarTabla();
  }

  llenarTabla(){
    this.servicioEvaluacion.obtenerTodos().subscribe(
      evaluaciones => {
        this.evaluaciones = evaluaciones;
        this.dtTrigger.next();
      }
    );
  }

  redireccionar(){
    location.reload();
  }

  crearEvaluacion(form: any) {
    this.servicioEvaluacion.crearEvaluacion(this.evaluacion).subscribe(
      message => {
        Materialize.toast("Evaluacion creada", 3000, 'toastSuccess');
        this.redireccionar();
      },
      error => {
        if(error.status == 422)
        {
            Materialize.toast("La evaluacion ya existe", 3000, "toastError");
        }
      }
    );
    this.limpiarForm(form);
    this.close();
  }

  limpiarForm(form: any){
    form.reset();
  }

  eliminar(){
    this.cerrarConfirmacionEliminar();
    this.servicioEvaluacion.eliminar(this.evaluacion).subscribe(
      message => {
        let i = this.evaluaciones.indexOf(this.evaluacion);
        if(i > -1){
          this.evaluaciones.splice(i, 1);
        }
        Materialize.toast("Evaluacion eliminada", 3000, "toastSuccess");
        this.redireccionar();
      },
      error => {
        Materialize.toast("Error al eliminar evaluacion", 3000, "toastError");
      }
    );
  }

  actualizar(){
    this.cerrarConfirmacionActualizar();
    this.servicioEvaluacion.actualizar(this.evaluacion).subscribe(
      message => {
        let i = this.evaluaciones.indexOf(this.evaluacion);
        if(i > -1){
          this.evaluaciones.splice(i, 1);
        }
        Materialize.toast("Evaluacion finalizada", 3000, "toastSuccess");
        this.redireccionar();
      },
      error => {
        Materialize.toast("Error al finalizar la evaluacion", 3000, "toastError");
      }
    );
  }
}
