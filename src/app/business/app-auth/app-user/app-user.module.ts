import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppUserComponent} from './app-user.component';
import {AppUserRoutingModule} from './app-user-routing.module';
import {TableModule} from '../../../shared/table/table.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    AppUserRoutingModule,
    TableModule,
    HttpClientModule
  ],
  declarations: [AppUserComponent]
})
export class AppUserModule {
}
