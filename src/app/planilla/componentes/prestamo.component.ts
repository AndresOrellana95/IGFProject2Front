import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { CookieService } from 'ngx-cookie';
import { Subject } from 'rxjs/Rx';
import * as moment from 'moment'
import { DatepickerOptions } from 'ng2-datepicker'
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { ServicioPlanilla, Empleado, Prestamo, TipoPrestamo} from './../servicios';
declare var Materialize: any;
declare var $: any;

@Component({
  templateUrl: './prestamo.component.html',
  styleUrls: [ './prestamo.component.css' ]
})

export class CrearPrestamo implements OnInit {
  id: number;
  bandera: boolean;
  codigoE: string;
  nombre: string;
  empleado: Empleado;
  prestamo: Prestamo;
  dpOptions: DatepickerOptions = {};
  tipo: TipoPrestamo;
  tipos: TipoPrestamo[];
  modalResultados = new EventEmitter<string | MaterializeAction>();

  constructor(private servicioPlanilla: ServicioPlanilla,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.dpOptions = {
      minYear: 1960,
      displayFormat: 'DD MM YYYY',
      barTitleFormat: 'MMMM YYYY',
      firstCalendarDay: 1
    };
  }

  ngOnInit() {
    this.prestamo = new Prestamo;
    this.empleado = new Empleado;
    this.tipo = new TipoPrestamo;
    this.tipos = new Array<TipoPrestamo>();
    this.bandera = false;
    this.consultarTipos();
  }

  abrirModal() {
    this.modalResultados.emit({action:"modal", params:['open']});
  }

  cerrarModal() {
    this.modalResultados.emit({action:"modal", params:['close']});
  }

  consultarTipos() {
    this.servicioPlanilla.obtenerTiposPrestamo().subscribe(
      tipos => {
        this.tipos = tipos;
      }
    );
  }

  consultarEmpleado() {
    this.servicioPlanilla.buscarEmpleado(this.codigoE).subscribe(
      empleado => {
        this.empleado = empleado;
        this.bandera = true;
      }
    );
  }

  crearPrestamo() {
    if(this.bandera == true) {
      this.servicioPlanilla.crearPrestamo(this.empleado.id,this.prestamo).subscribe(
        prestamo => {
          this.bandera = false;
          this.prestamo = prestamo;
          Materialize.toast("Prestamo creado", 3000, 'toastSuccess');
          this.abrirModal();
        },
        error => {
          if(error.status == 422)
          {
              Materialize.toast("Ocurrió un problema al realizar la operación", 3000, "toastError");
          }
        }
      );
    }
    else {
      Materialize.toast("No se ha asignado ningún empleado", 3000, "toastError");
    }
  }
}
