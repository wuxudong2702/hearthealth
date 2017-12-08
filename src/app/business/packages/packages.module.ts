import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PackagesComponent} from './packages.component';
import {PackagesRoutingModule} from './packages-routing.module';
import {TableModule} from '../../shared/table/table.module';
import {HttpClientModule} from '@angular/common/http';
import { UploadComponent } from './upload/upload.component';
import {FileUploadModule } from 'ng2-file-upload';


@NgModule({
  imports: [
    CommonModule,
    PackagesRoutingModule,
    TableModule,
    HttpClientModule,
    FileUploadModule
  ],
  declarations: [PackagesComponent, UploadComponent]
})
export class PackagesModule {
}
