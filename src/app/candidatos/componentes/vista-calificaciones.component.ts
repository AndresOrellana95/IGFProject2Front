import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { CookieService } from 'ngx-cookie';
import { Subject } from 'rxjs/Rx';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { Candidato, servicioCandidatos, Evaluacion } from './../servicios';
declare var Materialize: any;
declare var $: any;

@Component({
  templateUrl: './vista-calificaciones.component.html'
})

export class CalificacionesCandidato implements OnInit {
  candidato: Candidato;
  candidatos: Candidato[];
  evaluacion: Evaluacion;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private servicioCandidatos: servicioCandidatos,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService
  ) {
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
    $(document).ready(function(){
      $('.collapsible').collapsible();
    });
  }

  ngOnInit() {
    this.candidato = new Candidato;
    this.candidatos = new Array<Candidato>();
    this.evaluacion = new Evaluacion;
    this.consultarCalificaciones();
  }

  consultarCalificaciones() {
    this.servicioCandidatos.consultarCalificaciones().subscribe(
      candidatos => {
        this.candidatos = candidatos;
      }
    );
  }
}
