import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from './../../../environments/environment';
import { CookieService } from 'ngx-cookie';
import { Evaluacion, Candidato  } from './'

@Injectable()

export class servicioEvaluacion {
  baseUrl: string;
  headers: Headers;

  constructor(
    private http: Http,
    private cookieService: CookieService
  ){
    this.baseUrl = environment.apiURL;
    this.headers = new Headers({ 'Content-Type': 'application/json' });
  }

  obtenerTodos(): Observable<Evaluacion[]> {
    let url = this.baseUrl + '/evaluations';

    // Realizando GET
    return this.http.get(url, { headers: this.headers }).map(
      // Mapeando la salida
      (response: Response) => {
        let r = response.json();
        let evaluaciones = new Array<Evaluacion>();

        r.forEach((_evaluacion) => {
          let evaluacion = new Evaluacion;
          evaluacion.id = _evaluacion['id'];
          evaluacion.name = _evaluacion['name'];
          evaluacion.observation = _evaluacion['observation'];
          evaluacion.state = _evaluacion['state'];

          evaluaciones.push(evaluacion);
        });
        return evaluaciones;
      }
    );
  }

  crearEvaluacion(evaluacion: Evaluacion): Observable<string>{
    let url = this.baseUrl + '/evaluations';

    let q = JSON.stringify({
      name: evaluacion.name, observation: evaluacion.observation
    });

    return this.http.post(url, q, { headers: this.headers }).map(
      (response: Response) => {
        let r = response.json();
        return r['message'];
      }
    );
  }

  actualizar(evaluacion: Evaluacion): Observable<string>{
    let url = this.baseUrl + "/evaluations/" + evaluacion.id + "/state";
    let q = JSON.stringify({
      change: true
    });
    return this.http.put(url, q, {headers: this.headers}).map(
      (response: Response) => {
        let r = response.json();
        return r['message'];
      }
    );
  }

  eliminar(evaluacion: Evaluacion): Observable<string>{
    let url = this.baseUrl + "/evaluations/" + evaluacion.id;
    return this.http.delete(url, { headers: this.headers }).map(
      (response: Response) => {
        let r = response.json();
        return r['message'];
      }
    );
  }
}
