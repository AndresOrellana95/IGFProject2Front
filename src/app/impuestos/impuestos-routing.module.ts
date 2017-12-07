import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { gestionImpuesto } from './componentes';

const routes: Routes = [
  {
    path: 'impuestos',
    component: gestionImpuesto,
    children: [
      {
        path:'',
        component: gestionImpuesto
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class impuestoRoutingModule { }
