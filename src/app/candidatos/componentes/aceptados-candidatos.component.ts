import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { CookieService } from 'ngx-cookie';
import { Subject } from 'rxjs/Rx';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { Candidato, servicioCandidatos, Evaluacion } from './../servicios';
declare var Materialize: any;

@Component({
  templateUrl: './aceptados-candidatos.component.html'
})

export class enProceso implements OnInit{
  candidatos: Candidato[];
  candidato: Candidato;
  fullname: string;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  modalConfirmarInscripcion = new EventEmitter<string | MaterializeAction>();
  modalConfirmarRechazo = new EventEmitter<string | MaterializeAction>();

  constructor(private servicioCandidatos: servicioCandidatos,
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

  abrirInscripcion(candidato: Candidato) {
    this.candidato = candidato;
    this.modalConfirmarInscripcion.emit({ action: "modal", params: ['open'] });
  }

  cerrarInscripcion() {
    this.modalConfirmarInscripcion.emit({ action: "modal", params: ['close'] });
  }

  abrirRechazo(candidato: Candidato) {
    this.candidato = candidato;
    this.modalConfirmarRechazo.emit({ action: "modal", params: ['open'] });
  }

  cerrarRechazo() {
    this.modalConfirmarRechazo.emit({ action: "modal", params: ['close'] });
  }

  ngOnInit() {
    this.candidato = new Candidato;
    this.llenarTabla();
  }

  llenarTabla(){
    this.servicioCandidatos.obtenerTodos().subscribe(
      candidatos => {
        this.candidatos = candidatos;
        this.dtTrigger.next();
      }
    );
  }

  redireccionar(){
    location.reload();
  }

  actualizar(state: number){
    this.candidato.state = state;
    this.servicioCandidatos.actualizar(this.candidato).subscribe(
      message => {
        let i = this.candidatos.indexOf(this.candidato);
        if(i > -1){
          this.candidatos.splice(i, 1);
        }
        Materialize.toast("Transaccion realizada", 3000, "toastSuccess");
        this.redireccionar();
      },
      error => {
        Materialize.toast("Error al modificar los datos", 3000, "toastError");
      }
    );
  }
}
