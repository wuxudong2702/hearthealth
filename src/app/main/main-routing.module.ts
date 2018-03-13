import {NgModule, OnInit} from '@angular/core';
import {RouterModule, Routes, Router} from '@angular/router';
import {MainComponent} from './main.component';

/**
 * 主体路由
 */
const mainRoutes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {path: 'home', loadChildren: 'app/business/home/home.module#HomeModule'},
            // {path: 'demo', loadChildren: 'app/business/demo/demo.module#DemoModule'},
            // {path: 'user', loadChildren: 'app/business/user/user.module#UserModule'},
            // {path: 'role', loadChildren: 'app/business/role/role.module#RoleModule'},

            {path: 'admin-role-show', loadChildren: 'app/business/admin-auth/admin-role/admin-role.module#AdminRoleModule'},
            {path: 'admin-user-show', loadChildren: 'app/business/admin-auth/admin-user/admin-user.module#AdminUserModule'},
            {path: 'app-role-show', loadChildren: 'app/business/app-auth/app-role/app-role.module#AppRoleModule'},
            {path: 'app-user-show', loadChildren: 'app/business/app-auth/app-user/app-user.module#AppUserModule'},
            {path: 'heart-dev-show', loadChildren: 'app/business/dev/dev.module#DevModule'},
            {path: 'ecgd-chart-show', loadChildren: 'app/business/heart/ecgd/ecgd.module#EcgdModule'},
            {path: 'ecgd-chart-show/:id', loadChildren: 'app/business/heart/ecgd/ecgd.module#EcgdModule'},
            {path: 'hhr-show', loadChildren: 'app/business/heart/hhr/hhr.module#HhrModule'},
            {path: 'hhr-show/:id', loadChildren: 'app/business/heart/hhr/hhr.module#HhrModule'},
            {path: 'info-show', loadChildren: 'app/business/infos/news/news.module#NewsModule'},
            {path: 'app-upgrade-show', loadChildren: 'app/business/packages/packages.module#PackagesModule'},
            {path: 'log', loadChildren: 'app/business/log/log.module#LogModule'},
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(mainRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class MainRoutingModule {
}
