import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from './../../../environments/environment';
import { CookieService } from 'ngx-cookie';
import { Impuesto, detalleImpuesto } from './';

@Injectable()

export class servicioImpuesto {
  baseUrl: string;
  headers: Headers;

  constructor(
    private http: Http,
    private cookieService: CookieService
  ) {
    this.baseUrl = environment.apiURL;
    this.headers = new Headers({ 'Content-Type': 'application/json' });
  }

  obtenerTodos(): Observable<Impuesto[]> {
    let url = this.baseUrl + '/taxes';

    // Realizando GET
    return this.http.get(url, { headers: this.headers }).map(
      // Mapeando la salida
      (response: Response) => {
        let r = response.json();
        let impuestos = new Array<Impuesto>();

        r.forEach((_impuesto) => {
          let impuesto = new Impuesto;
          impuesto.id = _impuesto['id'];
          impuesto.name = _impuesto['name'];
          impuesto.client = _impuesto['client'];
          impuesto.patron = _impuesto['patron'];
          impuesto.roof = _impuesto['roof'];

          let detalle = new detalleImpuesto;
          impuestos.push(impuesto);
        });
        return impuestos;
      }
    );
  }

  crearImpuesto(impuesto: Impuesto): Observable<string>{
    let url = this.baseUrl + '/taxes';

    let q = JSON.stringify({
      name: impuesto.name, client: impuesto.client, patron: impuesto.patron, roof: impuesto.roof
    });

    return this.http.post(url, q, { headers: this.headers }).map(
      // Mapeando salida
      (response: Response) => {
        let r = response.json();
        return r['message'];
      }
    );
  }

  eliminar(impuesto: Impuesto): Observable<string>{
    let url = this.baseUrl + "/taxes/" + impuesto.id;
    return this.http.delete(url, { headers: this.headers }).map(
      (response: Response) => {
        let r = response.json();
        return r['message'];
      }
    );
  }

}
