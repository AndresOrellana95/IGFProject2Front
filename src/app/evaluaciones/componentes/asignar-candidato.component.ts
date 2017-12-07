import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { CookieService } from 'ngx-cookie';
import { Subject } from 'rxjs/Rx';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { Evaluacion, Candidato, servicioEvaluacion, servicioCandidato } from './../servicios';
declare var Materialize: any;

@Component({
  templateUrl: './asignar-candidato.component.html',
  styleUrls: [ './asignar-candidato.component.css' ]
})

export class AsignarCandidato implements OnInit {
  idE: number;
  ids: number[];
  candidato: Candidato;
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

  ngOnInit() {
    this.idE = this.route.snapshot.params['id'];
    this.candidato = new Candidato;
    this.candidatos = new Array<Candidato>();
    this.ids = new Array<number>();
    this.obtenerCandidatos();
  }

  obtenerCandidatos() {
    this.servicioCandidato.consultarCandidatos().subscribe(
      candidatos => {
        this.candidatos = candidatos;
      }
    );
  }

  controlArreglo(event) {
    var c = event.target.checked;
    var id = event.target.value;
    if(c == true){
      this.ids.push(id);
      console.log(this.ids);
    }
    else
    {
      var t = new Array<number>();
      t.push(id);
      this.ids = this.ids.filter(elemento => !t.includes(elemento));
    }
  }

  asignarCandidatoEvaluacion() {
    this.servicioCandidato.asignarCandidatoEvaluacion(this.idE, this.ids).subscribe(
      message => {
        Materialize.toast("Bien",3000,"toastSuccess");
      }
    );
  }
}
