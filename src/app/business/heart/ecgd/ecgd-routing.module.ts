import { NgModule }   from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EcgdComponent } from './ecgd.component';

const userRoutes: Routes = [
    {
        path: '', component: EcgdComponent,
        children: [
        ]
    }
]


@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class EcgdRoutingModule { }