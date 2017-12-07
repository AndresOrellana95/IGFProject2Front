import { PagoEmpleado } from './pago-empleado'

export class Pago {
  id: number;
  name: string;
  description: string;
  datePay: Date;
  update: Date;
  amount: number;
  salaryType_id: number;
  type: string;
  state: boolean;
  paysEmployee: PagoEmpleado[];
}
