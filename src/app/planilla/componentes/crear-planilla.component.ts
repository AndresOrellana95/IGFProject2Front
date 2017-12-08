import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { CookieService } from 'ngx-cookie';
import { Subject } from 'rxjs/Rx';
import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { ServicioPlanilla, Asistencia, Empleado, Pago, TipoSalario } from './../servicios';
declare var Materialize: any;
declare var $: any;

@Component({
  templateUrl: './crear-planilla.component.html',
  styleUrls: [ './crear-planilla.component.css' ]
})

export class CrearPlanilla implements OnInit{
  id: number;
  pago: Pago;
  nombre: string;
  tipo: TipoSalario;
  tipos: TipoSalario[];
  dpOptions: DatepickerOptions = {};

  constructor(
    private servicioPlanilla: ServicioPlanilla,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.dpOptions = {
      minYear: 1970,
      maxYear: 2030,
      displayFormat: 'MMM D[,] YYYY',
      barTitleFormat: 'MMMM YYYY',
      firstCalendarDay: 1
    };
  }

  ngOnInit() {
    this.id = this.route.snapshot.queryParams['id'];
    this.tipo = new TipoSalario;
    this.tipos = new Array<TipoSalario>();
    this.pago = new Pago;
    this.consultarTipoSalario();
  }

  consultarTipoSalario() {
    this.servicioPlanilla.obtenerTipoSalario().subscribe(
      tipos => {
        this.tipos = tipos;
      }
    );
  }

  generarPlanilla() {
    this.servicioPlanilla.crearPlanilla(this.pago).subscribe(
      message => {
        Materialize.toast("Registro de planilla creada", 3000, "toastSuccess");
        this.router.navigate(['/planilla/']);
      },
      error => {
        Materialize.toast("Error al realizar la operación",3000 ,"toastError");
      }
    );
  }

}
