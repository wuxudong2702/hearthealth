import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GuideComponent} from './guide.component';
import {GuideRoutingModule} from './guide-routing.module';

@NgModule({
    imports: [
        CommonModule,
        GuideRoutingModule
    ],
    declarations: [GuideComponent]
})
export class GuideModule {
}
