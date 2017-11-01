import { NgModule }   from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HhrComponent } from './hhr.component';

const userRoutes: Routes = [
    {
        path: '', component: HhrComponent,
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
export class HhrRoutingModule { }