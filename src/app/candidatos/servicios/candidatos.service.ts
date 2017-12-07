import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from './../../../environments/environment';
import { CookieService } from 'ngx-cookie';
import { Candidato, EstadoCivil, Puesto, Empleado, Evaluacion, TipoSalario, Impuesto, Horario } from './'

@Injectable()

export class servicioCandidatos {
  baseUrl: string;
  headers: Headers;

  constructor(
    private http: Http,
    private cookieService: CookieService
  ) {
    this.baseUrl = environment.apiURL;
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get('token') });
  }

  obtenerCandidato(id: number): Observable<Candidato> {
    let url = this.baseUrl + '/candidates/' + id;

    return this.http.get(url, {headers: this.headers}).map(
      (response: Response) => {
        let r = response.json();
        let candidato = new Candidato;

        candidato.id = id;
        candidato.fullname = r['fullname'];
        candidato.dui = r['dui'];
        candidato.nit = r['nit'];
        candidato.isss = r['isss'];
        candidato.telephone = r['telephone'];
        candidato.cellphone = r['cellphone'];
        candidato.sex = r['sex'];
        candidato.civilstatus = r['CivilStatus'];
        candidato.direction = r['direction'];

        return candidato;
      }
    );
  }

  obtenerEstadosCiviles(): Observable<EstadoCivil[]> {
    let url = this.baseUrl + '/civilstatuses';

    return this.http.get(url, { headers: this.headers }).map(
      (response: Response) => {
        let r = response.json();
        let estados = new Array<EstadoCivil>();

        r.forEach((_estado) => {
          let estado = new EstadoCivil;
          estado.id = _estado['id'];
          estado.name = _estado['name'];

          estados.push(estado);
        });
        return estados;
      }
    );
  }

  obtenerPuestos(): Observable<Puesto[]> {
    let url = this.baseUrl + '/jobs';

    return this.http.get(url, { headers: this.headers }).map(
      (response: Response) => {
        let r = response.json();
        let puestos = new Array<Puesto>();

        r.forEach((_puesto) => {
          let puesto = new Puesto;
          puesto.id = _puesto['id'];
          puesto.name = _puesto['name'];

          puestos.push(puesto);
        });
        return puestos;
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

  obtenerImpuestos(): Observable<Impuesto[]> {
    let url = this.baseUrl + '/taxes';

    return this.http.get(url, { headers: this.headers }).map(
      (response: Response) => {
        let r = response.json();
        let impuestos = new Array<Impuesto>();

        r.forEach((_impuesto) => {
          let impuesto = new Impuesto;
          impuesto.id = _impuesto['id'];
          impuesto.name = _impuesto['name'];

          impuestos.push(impuesto);
        });
        return impuestos;
      }
    );
  }

  obtenerTodos(): Observable<Candidato[]> {
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

  actualizar(candidato: Candidato): Observable<string>{
    let url = this.baseUrl + "/candidates/" + candidato.id + "/state";
    let q = JSON.stringify({
      change: candidato.state
    });
    return this.http.put(url, q, {headers: this.headers}).map(
      (response: Response) => {
        let r = response.json();
        return r['message'];
      }
    );
  }

  contratarCandidato(id: number,empleado: Empleado): Observable<string>{
    let url = this.baseUrl + '/candidates/' + id + '/hire';

    let q = JSON.stringify({
      code: empleado.code,
	    job_id:empleado.job_id,
	    admition:empleado.admition,
	    salary:empleado.salary,
	    bankaccount:empleado.bankAccount,
	    salarytype_id:empleado.salarytype_id,
	    timeIn:empleado.schedule.timeIn,
	    timeOut:empleado.schedule.timeOut,
	    pensionType_id:empleado.taxe_id
    });
    return this.http.post(url, q, { headers: this.headers }).map(
      (response: Response) => {
        let r = response.json();
        return r['message'];
      }
    );
  }

  consultarCalificaciones(): Observable<Candidato[]>{
    let url = this.baseUrl + '/candidatesClass';

    return this.http.get(url, {headers: this.headers}).map(
      (response: Response) => {
        let r = response.json();
        let candidatos = new Array<Candidato>();
        let r1 = r[0]['InProcess'];
        r1.forEach((_candidato) => {
          let candidato = new Candidato;
          candidato.id = _candidato['id'];
          candidato.fullname = _candidato['fullname'];
          let e = _candidato['Evaluation'];
          console.log(e);
            let evaluaciones = new Array<Evaluacion>();
            e.forEach((_evaluacion) => {
              let evaluacion = new Evaluacion;
              evaluacion.name = _evaluacion['name'];
              evaluacion.grade = _evaluacion['grade'];
              evaluaciones.push(evaluacion);
            });
            candidato.evaluations = evaluaciones;

          candidatos.push(candidato);
        });
        return candidatos;
      }
    );
  }

}
