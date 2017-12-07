import { Puesto } from './puesto'
import { Asistencia } from './asistencia'
import { Prestamo } from './prestamo'
import { TipoSalario } from './tipo-salario'
import { Impuesto } from './impuesto'
import { PagoEmpleado } from './pago-empleado'

export class Empleado {
  id: number;
  code: string;
  fullname: string;
  active: boolean;
  retired: boolean;
  admition: Date;
  retirement: Date;
  comission: number;
  bankAccount: string;
  salary: number;
  job: Puesto;
  attendance: Asistencia[];
  loans: Prestamo[];
  salaryTipe: TipoSalario;
  taxes: Impuesto;
  paysEmployes: PagoEmpleado[];
}
