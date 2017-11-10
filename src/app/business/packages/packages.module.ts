import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PackagesComponent} from './packages.component';
import {PackagesRoutingModule} from './packages-routing.module';
import {UserModule} from '../../shared/table/table.module';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    PackagesRoutingModule,
    UserModule,
    HttpClientModule
  ],
  declarations: [PackagesComponent]
})
export class PackagesModule {
}
