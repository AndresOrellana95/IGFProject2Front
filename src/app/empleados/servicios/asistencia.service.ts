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
}
