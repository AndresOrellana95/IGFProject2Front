import { TipoPrestamo } from './tipo-prestamo'

export class Prestamo {
  id: number;
  code_emp: string;
  code_loan: string;
  created: Date;
  deadline: Date;
  value: number;
  fee: number;
  payed: boolean;
  loantypes_id: number;
  loanType: TipoPrestamo;
}
