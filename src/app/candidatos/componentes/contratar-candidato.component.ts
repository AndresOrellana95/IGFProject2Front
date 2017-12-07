import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { CookieService } from 'ngx-cookie';
import { Subject } from 'rxjs/Rx';
import { DatepickerOptions } from 'ng2-datepicker';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { Candidato, servicioCandidatos,Evaluacion, Empleado, Puesto, Horario, EstadoCivil, TipoSalario, Impuesto } from './../servicios';
declare var Materialize: any;

@Component({
  templateUrl: './contratar-candidato.component.html',
  styleUrls: [ './contratar-candidato.component.css' ]
})

export class ContratarCandidato implements OnInit{
  id: number;
  modal: any = {};
  candidato: Candidato;
  empleado: Empleado;
  horario: Horario;
  puesto: Puesto;
  puestos: Puesto[];
  estado: EstadoCivil;
  estados: EstadoCivil[];
  impuesto: Impuesto;
  impuestos: Impuesto[];
  tiposalario: TipoSalario;
  tiposalarios: TipoSalario[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dpOptions: DatepickerOptions = {};
  modalConfirmarInscripcion = new EventEmitter<string | MaterializeAction>();

  constructor(private servicioCandidatos: servicioCandidatos,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.dpOptions = {
      minYear: 1960,
      displayFormat: 'MMM D[,] YYYY',
      barTitleFormat: 'MMMM YYYY',
      firstCalendarDay: 1
    };
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.candidato = new Candidato;
    this.empleado = new Empleado;
    this.puesto = new Puesto;
    this.horario = new Horario;
    this.puestos = new Array<Puesto>();
    this.estado = new EstadoCivil;
    this.estados = new Array<EstadoCivil>();
    this.tiposalario = new TipoSalario;
    this.tiposalarios = new Array<TipoSalario>();
    this.impuesto = new Impuesto;
    this.impuestos = new Array<Impuesto>();
    this.buscarCandidato();
    this.consultarEstados();
    this.consultarTipoSalario();
    this.consultarPuestos();
    this.consultarImpuestos();
  }

  consultarPuestos() {
    this.servicioCandidatos.obtenerPuestos().subscribe(
      puestos => {
        this.puestos = puestos
      }
    );
  }

  consultarImpuestos() {
    this.servicioCandidatos.obtenerImpuestos().subscribe(
      impuestos => {
        this.impuestos = impuestos
      }
    );
  }

  consultarTipoSalario() {
    this.servicioCandidatos.obtenerTipoSalario().subscribe(
      tiposalarios => {
        this.tiposalarios = tiposalarios;
      }
    );
  }

  consultarEstados() {
    this.servicioCandidatos.obtenerEstadosCiviles().subscribe(
      estados => {
        this.estados = estados;
      }
    );
  }

  buscarCandidato() {
    this.servicioCandidatos.obtenerCandidato(this.id).subscribe(
      candidato => {
        this.candidato = candidato;
      }
    );
  }

  contratarCandidato() {
    this.empleado.schedule = this.horario;
    this.servicioCandidatos.contratarCandidato(this.id, this.empleado).subscribe(
      message => {
        Materialize.toast("Empleado registrado", 3000, 'toastSuccess');
        this.router.navigate(['/candidatos']);
      },
      error => {
        if(error.status == 422)
        {
            Materialize.toast("La evaluacion ya existe", 3000, "toastError");
        }
      }
    );
  }
}
