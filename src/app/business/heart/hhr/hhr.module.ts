import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HhrComponent} from './hhr.component';
import {HhrRoutingModule} from './hhr-routing.module';
import {UserModule} from '../../../shared/table/table.module';

@NgModule({
  imports: [
    CommonModule,
    HhrRoutingModule,
    UserModule
  ],
  declarations: [HhrComponent]
})
export class HhrModule {
}
