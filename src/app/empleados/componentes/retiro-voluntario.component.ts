import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { CookieService } from 'ngx-cookie';
import { Subject } from 'rxjs/Rx';
import { DatepickerOptions } from 'ng2-datepicker';
import * as moment from 'moment'
import * as frLocale from 'date-fns/locale/fr';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { ServicioAsistencia, ServicioEmpleado, Asistencia, Empleado, Retiro } from './../servicios';
declare var Materialize: any;

@Component({
  templateUrl: './retiro-voluntario.component.html',
  styleUrls: [ './retiro-voluntario.component.css' ]
})

export class RetiroEmpleado implements OnInit{
  total: number;
  salario: number;
  bandera: boolean;
  despido: boolean;
  empleado: Empleado;
  retiro: Retiro;
  dpOptions: DatepickerOptions = {};
  modalConfirmar = new EventEmitter<string | MaterializeAction>();

  constructor(private servicioAsistencia: ServicioAsistencia,
    private servicioEmpleado: ServicioEmpleado,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.dpOptions = {
      minYear: 1970,
      maxYear: 2030,
      displayFormat: 'DD/MM/YYYY'
    };
  }

  ngOnInit() {
    this.empleado = new Empleado;
    this.retiro = new Retiro;
    this.bandera = false;
  }

  consultarEmpleado(){
    this.servicioAsistencia.buscarEmpleado(this.empleado.code).subscribe(
      empleado => {
        this.bandera = true;
        this.empleado = empleado;
      }
    );
  }

  abrir() {
    if(this.bandera == true){
      this.modalConfirmar.emit({action:"modal",params:['open']});
    }
    else {
      Materialize.toast("No se ha selccionado un empleado",3000,"toastError");
    }
  }

  cerrar() {
    this.modalConfirmar.emit({action:"modal",params:['close']});
  }

  registrarAccion() {
    this.retiro.dateOut = moment(this.retiro.dateOut).format('DD/MM/YYYY');
    if(this.despido == true) {
      this.registrarDespido();
    }
    else{
      this.registrarRetiro();
    }
  }

  registrarDespido() {
    this.servicioEmpleado.registrarDespido(this.empleado.id, this.retiro).subscribe(
      retiro => {
        this.retiro = retiro;
        this.bandera = false;
      }
    );
  }

  registrarRetiro() {
    this.servicioEmpleado.registrarRetiro(this.empleado.id, this.retiro).subscribe(
      retiro => {
        this.retiro = retiro;
        this.bandera = false;
      }
    );
  }
}
