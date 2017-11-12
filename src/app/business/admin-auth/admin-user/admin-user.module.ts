import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminUserComponent} from './admin-user.component';
import {AdminUserRoutingModule} from './admin-user-routing.module';
import {TableModule} from '../../../shared/table/table.module';
import {HttpClientModule} from '@angular/common/http';

import {ZtreeModule} from '../../../shared/ztree/ztree.module';//ztree
import {AdminZtreeModule} from '../admin-ztree/admin-ztree.module';//ztree



@NgModule({
  imports: [
    CommonModule,
    AdminUserRoutingModule,
    TableModule,
    HttpClientModule,
    ZtreeModule,
    AdminZtreeModule,

  ],
  declarations: [AdminUserComponent],
})
export class AdminUserModule {
}


