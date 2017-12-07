import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { CookieService } from 'ngx-cookie';
import { Subject } from 'rxjs/Rx';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { ServicioPlanilla, Empleado, Pago} from './../servicios';
declare var Materialize: any;
declare var $: any;

@Component({
  templateUrl: './modificacion-planilla.component.html',
  styleUrls: [ './modificacion-planilla.component.css' ]
})

export class ModificacionPlanilla implements OnInit{
  empleado: Empleado;
  valor: number;
  bandera: boolean;
  descuento: boolean;
  id: number;
  codE: string;

  constructor(private servicioPlanilla: ServicioPlanilla,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.queryParams['id'];
    this.codE = this.route.snapshot.queryParams['codigo'];
    this.empleado = new Empleado;
    this.bandera = false;
    this.consultarEmpleado();
  }

  consultarEmpleado() {
    this.servicioPlanilla.buscarEmpleado(this.codE).subscribe(
      empleado => {
        this.empleado = empleado;
        console.log(this.empleado.id);
      },
      error => {
        Materialize.toast("No se encuentra el empleado",3000,"toastError");
      }
    );
  }

  realizarAccion() {
    if(this.descuento == false){
      this.realizarIngreso();
    }
    else {
      this.realizarDescuento();
    }
  }

  realizarDescuento() {
    this.servicioPlanilla.modificarDescuento(this.id, this.empleado.id, this.valor).subscribe(
      message => {
        Materialize.toast("Planilla modificada con éxito",3000,"toastSuccess");
        this.redireccionar();
      },
      error =>
      {
        Materialize.toast("Error el modificar planilla", 3000, "toastError");
      }
    );
  }

  realizarIngreso() {
    this.servicioPlanilla.modificarIngreso(this.id, this.empleado.id, this.valor).subscribe(
      message => {
        Materialize.toast("Planilla modificada con éxito",3000,"toastSuccess");
        this.redireccionar();
      },
      error =>
      {
        Materialize.toast("Error el modificar planilla", 3000, "toastError");
      }
    );
  }

  redireccionar() {
    this.router.navigate(['./planilla/'+this.id]);
  }
}
