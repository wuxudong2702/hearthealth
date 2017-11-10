import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DevComponent} from './dev.component';
import {DevRoutingModule} from './dev-routing.module';
import {UserModule} from '../../shared/table/table.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    DevRoutingModule,
    UserModule,
    HttpClientModule
  ],
  declarations: [DevComponent]
})
export class DevModule {
}
