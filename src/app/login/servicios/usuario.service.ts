import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { CookieService } from 'ngx-cookie';
import { environment } from './../../../environments/environment';
import { Usuario } from './'

@Injectable()

export class ServicioUsuario {
  baseUrl: string;
  headers: Headers;

  constructor(
    private http: Http,
    private cookieService: CookieService
  ) {
    this.baseUrl = environment.apiURL;
    this.headers = new Headers({ 'Content-Type': 'application/json','Authorization': this.cookieService.get('token')});
  }

  crearUsuario(usuario: Usuario): Observable<string>{
    let url = this.baseUrl + '/users';

    let q = JSON.stringify({
      fullname: usuario.fullname,
      password: usuario.password,
      email: usuario.email,
      group_id: 1,
    });

    return this.http.post(url, q, { headers: this.headers }).map(
      (response: Response) => {
        let r = response.json();
        return r['message'];
      }
    );
  }
}
