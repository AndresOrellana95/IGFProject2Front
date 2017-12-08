import { Empleado } from './empleado'
import { Pago } from './pago'

export class Planilla {
  id: number;
  name: string;
  month: string;
  year: number;
  employee: Empleado[];
  calculated: boolean;
  pay: Pago[];
}
