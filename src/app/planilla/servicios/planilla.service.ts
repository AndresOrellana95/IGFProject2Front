import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from './../../../environments/environment';
import { CookieService } from 'ngx-cookie';
import { Empleado, Impuesto, Prestamo, Puesto, Pago, TipoPrestamo, TipoSalario, PagoEmpleado } from './';

@Injectable()

export class ServicioPlanilla {
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

  obtenerTiposPrestamo(): Observable<TipoPrestamo[]> {
    let url = this.baseUrl + '/loantypes';

    return this.http.get(url, { headers: this.headers }).map(
      (response: Response) => {
        let r = response.json();
        let tipos = new Array<TipoPrestamo>();

        r.forEach((_tipo) => {
          let tipo = new TipoPrestamo;
          tipo.id = _tipo['id'];
          tipo.name = _tipo['name'];

          tipos.push(tipo);
        });
        return tipos;
      }
    );
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

  consultarPlanillas():Observable<Pago[]> {
    let url = this.baseUrl + "/pays";
    return this.http.get(url, {headers: this.headers}).map(
      (response: Response) => {
        let r = response.json();
        let r2 = r['Pays'];
        let planillas = new Array<Pago>();
        r2.forEach((_planilla) => {
          let planilla = new Pago;
          planilla.id = _planilla['id'];
          planilla.name = _planilla['name'];
          planilla.description = _planilla['description'];
          planilla.datePay = _planilla['datePay'];
          //Cambiar luego
          planilla.state = false;

          planillas.push(planilla);
        });
        console.log(planillas);
        return planillas;
      }
    );
  }

  consultarDetallePlanilla(id: number):Observable<PagoEmpleado[]>{
    let url = this.baseUrl + '/pays/' + id;
    return this.http.get(url, {headers: this.headers}).map(
      (response: Response) => {
        let r = response.json();
        let r2 = r['pay'];
        let pagos = new Array<PagoEmpleado>();
        r2.forEach((_pago) => {
          let pago = new PagoEmpleado;
          pago.id = _pago['id'];
          pago.code = _pago['code'];
          pago.name = _pago['name'];
          pago.baseSalary = _pago['baseSalary'];
          pago.days = _pago['days'];
          pago.bond = _pago['bond'];
          pago.isss = _pago['isss'];
          pago.rent = _pago['rent'];
          pago.loans = _pago['loans'];
          pago.othersDiscounts = _pago['othersDiscounts'];
          pago.othersIncomes = _pago['othersIncomes'];
          pagos.push(pago);
        });
        return pagos;
      }
    );
  }

  crearPrestamo(id:number, prestamo: Prestamo): Observable<Prestamo>{
    let url = this.baseUrl + '/employees/' + id  + '/loans';

    let q = JSON.stringify({
      loantypes_id: prestamo.loantypes_id,
      code_loan: prestamo.code_loan,
      deadline: prestamo.deadline,
      value: prestamo.value
    });
    return this.http.post(url, q, { headers: this.headers }).map(
      (response: Response) => {
        let r = response.json();
        prestamo.created = r['OriginDate'];
        prestamo.deadline = r['DeadLine'];
        prestamo.fee = r['fee'];
        return prestamo;
      }
    );
  }

  crearPlanilla(pago: Pago):Observable<string> {
    let url = this.baseUrl + '/pays/';
    let q = JSON.stringify({
      name: pago.name,
      description: pago.description,
      datePay: pago.datePay,
      salarytype_id: pago.salaryType_id
    });

    return this.http.post(url, q, {headers: this.headers}).map(
      (response: Response) => {
        let r = response.json();
        return r['message'];
      }
    );
  }

  calcularPlanilla(id: number): Observable<string> {
    let url = this.baseUrl + '/pays/' + id;
    return this.http.put(url, {headers: this.headers}).map(
      (response: Response) => {
        let r = response.json();
        return r['message'];
      }
    );
  }

  modificarDescuento(id:number, idE:number ,value: number):Observable<string>{
    let url = this.baseUrl + '/pays/' + id + '/employees/' + idE + '/otherDiscounts';
    let q = JSON.stringify({
      value: value
    });

    return this.http.post(url, q, {headers: this.headers}).map(
      (response: Response) => {
        let r = response.json();
        return r['message'];
      }
    );
  }

  modificarIngreso(id:number, idE:number, value:number):Observable<string> {
    let url = this.baseUrl + '/pays/' + id + '/employees/' + idE + '/otherIncomes';
    let q = JSON.stringify({
      value: value
    });

    return this.http.post(url, q, {headers: this.headers}).map(
      (response: Response) => {
        let r = response.json();
        return r['message'];
      }
    );
  }

}
