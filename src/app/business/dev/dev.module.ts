import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevComponent } from './dev.component';
import {DevRoutingModule} from './dev-routing.module';

@NgModule({
  imports: [
    CommonModule,
      DevRoutingModule
  ],
  declarations: [DevComponent]
})
export class DevModule { }
