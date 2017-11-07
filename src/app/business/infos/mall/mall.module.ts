import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MallComponent} from './mall.component';
import {MallRoutingModule} from './mall-routing.module';
import {UserModule} from '../../../shared/table/table.module';

@NgModule({
  imports: [
    CommonModule,
    MallRoutingModule,
    UserModule
  ],
  declarations: [MallComponent]
})

export class MallModule {
}
