import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { CookieService } from 'ngx-cookie';
import { Subject } from 'rxjs/Rx';
import * as moment from 'moment';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { ServicioAsistencia, Empleado, Asistencia} from './../servicios';
declare var Materialize: any;
declare var $: any;

@Component({
  templateUrl: './ingreso-asistencia.component.html'
})

export class IngresoAsistencia implements OnInit{
  id: number;
  fileData: any = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  modalResultados = new EventEmitter<string | MaterializeAction>();

  constructor(
    private route: ActivatedRoute,
    private servicioAsistencia: ServicioAsistencia,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
  }

  abrir() {
    this.modalResultados.emit({action:"modal", params:['open']});
  }

  cerrar() {
    this.modalResultados.emit({action:"modal", params:['close']});
  }

  guardarAsistencia() {
    console.log(this.fileData);
  }

  openFile(event) {
    let input = event.target;
    for (var index = 0; index < input.files.length; index++) {
        let reader = new FileReader();
        reader.onload = () => {
            // this 'text' is the content of the file
            var text = reader.result;
            var lines = text.split('\n');
            for(var line = 0; line < lines.length; line++) {
              var columns = lines[line].split(',');
              var f;
              //f = f + columns[5]+':'+columns[6]+':00';
              f = new Date(f);
              f.setYear('20'+columns[9]);
              f.setMonth(columns[7]);
              f.setDate(columns[8]);
              f.setHours(columns[5], columns[6])
              let rows = {
                x1:columns[0],
                x2:columns[1],
                x3:columns[2],
                code:columns[3],
                x4:columns[4],
                fecha: moment(f).format('YYYY-MM-DD HH:mm:ss'),
                x5:columns[10],
                x6:columns[11],
                x7:columns[12],
                x8:columns[13],
                x9:columns[14],
                x10:columns[15],
                x11:columns[16],
                x12:columns[17],
                x13:''
              };
              this.fileData.push(rows);
            }
        }
        reader.readAsText(input.files[index]);
    };
  }
}
