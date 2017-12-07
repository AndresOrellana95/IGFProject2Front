import { Candidato } from './candidato'

export class Evaluacion {
  id: number;
  name: string;
  observation: string;
  state: boolean;
  candidats: Candidato[];
}
