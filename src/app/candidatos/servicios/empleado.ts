import { Puesto } from './puesto'
import { Horario } from './horario'
import { EstadoCivil } from './estado-civil'
import { Impuesto } from './impuesto'

export class Empleado {
  id: number;
  code: string;
  name: string;
  active: boolean;
  retired: boolean;
  admition: Date;
  retirement: Date;
  comission: number;
  bankAccount: string;
  salary: number;
  salarytype_id: number;
  job_id: number;
  schedule: Horario;
  civilstatues_id: number;
  taxe_id: number;
}
