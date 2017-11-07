import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoleComponent} from './admin-role.component';
import {AdminRoleRoutingModule} from './admin-role-routing.module';
import {UserModule} from '../../../shared/table/table.module';

@NgModule({
    imports: [
        CommonModule,
        AdminRoleRoutingModule,
      UserModule
    ],
    declarations: [AdminRoleComponent]
})
export class AdminRoleModule {
}
