import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EcgdComponent} from './ecgd.component';
import {EcgdRoutingModule} from './ecgd-routing.module';

@NgModule({
    imports: [
        CommonModule,
        EcgdRoutingModule
    ],
    declarations: [EcgdComponent]
})
export class EcgdModule {
}
