import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from './../../../environments/environment';
import { CookieService } from 'ngx-cookie';
import { Empleado, Retiro, TipoSalario } from './';

@Injectable()

export class ServicioEmpleado {
  baseUrl: string;
  headers: Headers;

  constructor(
    private http: Http,
    private cookieService: CookieService
  ) {
    this.baseUrl = environment.apiURL;
    this.headers = new Headers({ 'Content-Type': 'application/json' });
  }

  obtenerTipoSalario(): Observable<TipoSalario[]> {
    let url = this.baseUrl + '/salaries';

    return this.http.get(url, { headers: this.headers }).map(
      (response: Response) => {
        let r = response.json();
        let tiposalarios = new Array<TipoSalario>();

        r.forEach((_tiposalario) => {
          let tiposalario = new TipoSalario;
          tiposalario.id = _tiposalario['id'];
          tiposalario.name = _tiposalario['name'];

          tiposalarios.push(tiposalario);
        });
        return tiposalarios;
      }
    );
  }

  registrarDespido(id: number, retiro: Retiro): Observable<Retiro>{
    let url = this.baseUrl + '/employees/' + id  + '/fired';

    let q = JSON.stringify({
      dateOut: retiro.dateOut
    });

    return this.http.post(url, q, { headers: this.headers }).map(
      (response: Response) => {
        let r = response.json();
        let resultados = new Retiro;

        resultados.dateIn = r['dateIn'];
        resultados.salary = r['salary'];
        resultados.total = r['total'];
        resultados.dateOut = r['dateOut'];
        return resultados;
      }
    );
  }

  registrarRetiro(id: number, retiro: Retiro): Observable<Retiro>{
    let url = this.baseUrl + '/employees/' + id  + '/retired';

    let q = JSON.stringify({
      dateOut: retiro.dateOut
    });

    return this.http.post(url, q, { headers: this.headers }).map(
      (response: Response) => {
        let r = response.json();
        let resultados = new Retiro;

        resultados.dateIn = r['dateIn'];
        resultados.salary = r['salary'];
        resultados.total = r['total'];
        resultados.dateOut = r['dateOut'];
        return resultados;
      }
    );
  }

}
