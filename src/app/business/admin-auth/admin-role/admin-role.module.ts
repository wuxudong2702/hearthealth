import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoleComponent} from './admin-role.component';
import {AdminRoleRoutingModule} from './admin-role-routing.module';
import {UserModule} from '../../../shared/table/table.module';
import { AdminZtreeComponent } from './admin-ztree/admin-ztree.component';
import  { ZtreeModule}            from '../../../shared/ztree/ztree.module';//ztree


@NgModule({
    imports: [
        CommonModule,
        AdminRoleRoutingModule,
        ZtreeModule,
        UserModule
    ],
    declarations: [AdminRoleComponent, AdminZtreeComponent]
})
export class AdminRoleModule {
}
