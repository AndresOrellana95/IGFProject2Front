import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from './../../../environments/environment';
import { CookieService } from 'ngx-cookie';
import { Evaluacion, Candidato  } from './'

@Injectable()
export class servicioCandidato {
  baseUrl: string;
  headers: Headers;

  constructor(
    private http: Http,
    private cookieService: CookieService
  ) {
    this.baseUrl = environment.apiURL;
    this.headers = new Headers({ 'Content-Type': 'application/json','Authorization': this.cookieService.get('token') });
  }

  consultarCandidatos(): Observable<Candidato[]>{
    let url = this.baseUrl + '/candidates';

    return this.http.get(url, { headers: this.headers }).map(
      (response: Response) => {
        let r = response.json();
        let candidatos = new Array<Candidato>();

        r.forEach((_candidato) => {
          let candidato = new Candidato;
          candidato.id = _candidato['id'];
          candidato.fullname = _candidato['fullname'];
          candidato.state = _candidato['state'];

          candidatos.push(candidato);
        });
        return candidatos;
      }
    );
  }

  obtenerCandidatos(id: number): Observable<Candidato[]>{
    let url = this.baseUrl + '/evaluations/' + id + '/candidates';
    return this.http.get(url, {headers: this.headers}).map(
      (response:Response) => {
        let r = response.json();
        let candidatos = new Array<Candidato>();
        r.forEach((_candidato) => {
          if(_candidato['state'] != 0 && _candidato['state'] <= 3) {
            let candidato = new Candidato;
            candidato.id = _candidato['id'];
            candidato.fullname = _candidato['fullname'];
            candidato.state = _candidato['state'];
            candidato.grade = _candidato['grade'];
            candidatos.push(candidato);
          }
        });
        return candidatos;
      }
    );
  }

  asignarCandidatoEvaluacion(id: number, ids: any): Observable<any>{
    let url = this.baseUrl + '/evaluations/' + id + '/addCandidates';
    let q = JSON.stringify({
      ids: ids
    });
    return this.http.post(url, q, {headers: this.headers}).map(
      (response: Response) => {
        let r = response.json();
        return r['message'];
      }
    );
  }

  asignarNota(evaluacionId: number, candidatoId: number, nota: number): Observable<Candidato[]>{
    let url = this.baseUrl + '/evaluations/' + evaluacionId + '/candidates/' + candidatoId + '/qualify';
    let q = JSON.stringify({
      grade: nota
    });
    return this.http.post(url, q, {headers: this.headers}).map(
      (response: Response) => {
        let r = response.json();
        return r['message'];
      }
    );
  }

}
