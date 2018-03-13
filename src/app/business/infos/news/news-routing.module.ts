import { NgModule }   from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './news.component';

const userRoutes: Routes = [
    {
        path: '', component: NewsComponent,
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
export class NewsRoutingModule { }