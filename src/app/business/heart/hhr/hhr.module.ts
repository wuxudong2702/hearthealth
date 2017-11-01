import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HhrComponent} from './hhr.component';
import {HhrRoutingModule} from './hhr-routing.module';

@NgModule({
    imports: [
        CommonModule,
        HhrRoutingModule
    ],
    declarations: [HhrComponent]
})
export class HhrModule {
}
