import { NgModule }   from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogComponent } from './log.component';

const userRoutes: Routes = [
    {
        path: '', component: LogComponent,
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
export class LogRoutingModule { }