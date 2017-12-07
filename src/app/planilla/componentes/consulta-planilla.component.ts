import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { DatepickerOptions } from 'ng2-datepicker';
import { CookieService } from 'ngx-cookie';
import { Subject } from 'rxjs/Rx';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { ServicioPlanilla, Pago, TipoSalario } from './../servicios';
declare var Materialize: any;
declare var $: any;

@Component({
  templateUrl: './consulta-planilla.component.html',
  styleUrls: [ './consulta-planilla.component.css' ]
})

export class ConsultaPlanilla implements OnInit{
  id: number;
  planilla: Pago;
  planillas: Pago[];
  tipo: TipoSalario;
  tipos: TipoSalario[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private servicioPlanilla: ServicioPlanilla,
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
    this.planilla = new Pago;
    this.planillas = new Array<Pago>();
    this.tipo = new TipoSalario;
    this.tipos = new Array<TipoSalario>();
    this.consultarTipoSalario();
    this.consultarPlanillas();
    //this.asignarTipos();
  }

  redireccionar(planilla: Pago) {
    //Por defecto es false en el metodo
    if(planilla.state == true){
      this.router.navigate(['/planilla/'+ planilla.id]);
    }
    else
    {
      Materialize.toast("Debe generar los datos de planilla previamente",3000,"toastError");
    }
  }

  /*asignarTipos() {
    this.planillas.forEach((_planilla) => {
      alert("deberia");
    });
  }*/

  consultarTipoSalario() {
    this.servicioPlanilla.obtenerTipoSalario().subscribe(
      tipos => {
        this.tipos = tipos;
      }
    );
  }

  consultarPlanillas() {
    this.servicioPlanilla.consultarPlanillas().subscribe(
      planillas => {
        this.planillas = planillas;
      }
    );
  }

  calcularPlanilla(planilla: Pago) {
    planilla.state = true;
    /*this.servicioPlanilla.calcularPlanilla(planilla.id).subscribe(
      message => {
        Materialize.toast("Planilla calculada con exito", 3000, "toastSuccess");
      },
      error => {
        Materialize.toast("Ha ocurrido un error al realizar la operación", 3000, "toastError");
      }
    );*/
  }

}
