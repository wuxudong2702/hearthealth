import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppRoleComponent} from './app-role.component';
import {AppRoleRoutingModule} from './app-role-routing.module';
import {TableModule} from '../../../shared/table/table.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    AppRoleRoutingModule,
    TableModule,
    HttpClientModule
  ],
  declarations: [AppRoleComponent]
})
export class AppRoleModule {
}
