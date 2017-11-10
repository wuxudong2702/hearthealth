import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppRoleComponent} from './app-role.component';
import {AppRoleRoutingModule} from './app-role-routing.module';
import {UserModule} from '../../../shared/table/table.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    AppRoleRoutingModule,
    UserModule,
    HttpClientModule
  ],
  declarations: [AppRoleComponent]
})
export class AppRoleModule {
}
