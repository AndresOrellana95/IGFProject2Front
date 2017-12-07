import {Evaluacion } from './evaluacion'

export class Candidato {
  id: number;
  fullname:string;
	sex: string;
	telephone: number;
	cellphone:number;
	email: string;
	dui:string;
	nit:string;
	isss:string;
	direction: string;
	civilstatus: number;
	state: number;
	observation:string;
  evaluations: Evaluacion[];
}
