import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MallComponent} from './mall.component';
import {MallRoutingModule} from './mall-routing.module';

@NgModule({
    imports: [
        CommonModule,
        MallRoutingModule
    ],
    declarations: [MallComponent]
})

export class MallModule {
}
