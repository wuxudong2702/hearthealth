import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoleComponent} from './admin-role.component';
import {AdminRoleRoutingModule} from './admin-role-routing.module';
import {TableModule} from '../../../shared/table/table.module';
// import { AdminZtreeComponent } from '../admin-ztree/admin-ztree.component';
import {AdminZtreeModule} from '../admin-ztree/admin-ztree.module';//ztree

import  { ZtreeModule}            from '../../../shared/ztree/ztree.module';//ztree
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        AdminRoleRoutingModule,
        ZtreeModule,
        TableModule,
        HttpClientModule,
      AdminZtreeModule
    ],
    declarations: [AdminRoleComponent, ],
  exports:[]

})
export class AdminRoleModule {
}


