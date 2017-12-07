import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { CookieService } from 'ngx-cookie';
import { Subject } from 'rxjs/Rx';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { ServicioPlanilla, Empleado, Pago, PagoEmpleado} from './../servicios';
declare var Materialize: any;
declare var $: any;

@Component({
  templateUrl: './detalle-planilla.component.html',
  styleUrls: [ './detalle-planilla.component.css' ]
})

export class DetallePlanilla implements OnInit{
  id: number;
  empleado: Empleado;
  pago: PagoEmpleado;
  pagos: PagoEmpleado[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private servicioPlanilla: ServicioPlanilla,
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
    this.empleado = new Empleado;
    this.pago = new PagoEmpleado;
    this.pagos = new Array<PagoEmpleado>();
    this.id = this.route.snapshot.params['id'];
    this.consultarDetalles();
  }

  redireccionar(pago: PagoEmpleado) {
    this.router.navigate(['/planilla/modificacion'],{ queryParams: { id: this.id, codigo: pago.code } });
  }

  consultarDetalles() {
    this.servicioPlanilla.consultarDetallePlanilla(this.id).subscribe(
      pagos => {
        this.pagos = pagos;
      }
    );
  }
}
