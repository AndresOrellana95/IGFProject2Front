import { Component, OnInit, EventEmitter, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DataTableDirective } from "angular-datatables";
import { CookieService } from "ngx-cookie";
import { Subject } from "rxjs/Rx";
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { Evaluacion, Candidato, servicioEvaluacion, servicioCandidato } from "./../servicios";
declare var Materialize: any;

@Component({
  templateUrl: './agregar-candidatos.component.html',
  styleUrls: [ './agregar-candidatos.component.css' ]
})

export class agregarCandidato implements OnInit {
  evaluacionId: number;
  candidato: Candidato;
  evaluacion: Evaluacion;
  candidatos: Candidato[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private servicioEvaluacion: servicioEvaluacion,
    private servicioCandidato: servicioCandidato,
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
  }

  ngOnInit(){
    this.candidato = new Candidato;
    this.candidatos = new Array<Candidato>();
    this.evaluacionId = this.route.snapshot.params['id'];
    this.llenarTabla();
  }

  llenarTabla(){
    this.servicioCandidato.obtenerCandidatos(this.evaluacionId).subscribe(
      candidatos => {
        this.candidatos = candidatos;
        this.dtTrigger.next();
      }
    );
  }

  registrarNota(candidato: Candidato){
    if(candidato.grade <= 0 || candidato.grade > 10 || candidato.grade == null){
      Materialize.toast("Debe ingresar una calificación valida", 3000, "toastError")
    } else {
      this.servicioCandidato.asignarNota(this.evaluacionId,candidato.id, candidato.grade).subscribe(
        message => {
          Materialize.toast("Transaccion realizada", 3000, "toastSuccess");
        },
        error => {
          Materialize.toast("Error al modificar los datos", 3000, "toastError");
        }
      );
    }
  }

}
