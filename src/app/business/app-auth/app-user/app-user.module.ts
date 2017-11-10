import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppUserComponent} from './app-user.component';
import {AppUserRoutingModule} from './app-user-routing.module';
import {UserModule} from '../../../shared/table/table.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    AppUserRoutingModule,
    UserModule,
    HttpClientModule
  ],
  declarations: [AppUserComponent]
})
export class AppUserModule {
}
