import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from './../../../environments/environment';

import { Usuario } from './'

@Injectable()
export class ServicioAutenticacion {
  baseUrl: string;
  headers: Headers;

  constructor(private http: Http) {
    this.baseUrl = environment.apiURL;
    this.headers = new Headers({'Content-Type': 'application/json'});
  }

  iniciarSesion(correo: string, contra: string): Observable<any> {
    let url = this.baseUrl + '/auth/login';
    let q = JSON.stringify({ email: correo, password: contra });

    return this.http.post(url, q, { headers: this.headers }).map(
      (response: Response) => {
        let r = response.json();
        return {usuario: this.mapearUsuario(r['user']), token: "Bearer " + r['token']};
      }
    );
  }

  verificar(token:string): Observable<Usuario>{
    let url = this.baseUrl + "/authentication/verify/" + token;

    return this.http.get(url).map(
      (response: Response) => {
        let r = response.json();
        return this.mapearUsuario(r);
      }
    );
  }

  private mapearUsuario(r: any): Usuario{
    let usuario = new Usuario;
    usuario.id = 0;
    usuario.email = r['email'];
    usuario.fullname = r['fullname'];
    usuario.policies = r['policies'];

    return usuario;
  }
}
