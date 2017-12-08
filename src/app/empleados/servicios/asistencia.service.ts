import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from './../../../environments/environment';
import { CookieService } from 'ngx-cookie';
import { Asistencia, Empleado  } from './'

@Injectable()

export class ServicioAsistencia {
  baseUrl: string;
  headers: Headers;

  constructor(
    private http: Http,
    private cookieService: CookieService
  ) {
    this.baseUrl = environment.apiURL;
    this.headers = new Headers({ 'Content-Type': 'application/json' });
  }

  buscarEmpleado(code: string): Observable<Empleado> {
    let url = this.baseUrl + '/employees/' + code;

    return this.http.get(url, {headers:this.headers}).map(
      (response: Response) => {
        let r = response.json();
        let empleado = new Empleado;
        empleado.id = r['id'];
        empleado.code = r['code'];
        empleado.fullname = r['fullname'];

        return empleado;
      }
    );
  }

  obtenerAsistencias(): Observable<Asistencia[]> {
    let url = this.baseUrl + '/attendances';

    return this.http.get(url, {headers:this.headers}).map(
      (response: Response) => {
        let r = response.json();
        let r1 = r['Attendances'];
        let asistencias = new Array<Asistencia>();

        r1.forEach((_asistencia) => {
            let asistencia = new Asistencia;
            asistencia.id = _asistencia['id'];
            asistencia.name = _asistencia['name'];
            asistencia.type = _asistencia['type'];
            asistencia.division = _asistencia['division'];

            asistencias.push(asistencia);
        });
        return asistencias;
      }
    );
  }
}
