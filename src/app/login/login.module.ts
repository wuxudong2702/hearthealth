import { NgModule }   from '@angular/core';
import { CommonModule }       from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent }   from './login.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginRoutingModule } from './login-routing.module';



@NgModule({
  imports:      [
     CommonModule,
     FormsModule,
     ReactiveFormsModule,
     NgbModule,
     LoginRoutingModule,
     HttpClientModule
  ],
  declarations: [
     LoginComponent
  ],
  exports:      [],
  providers:    []
})
export class LoginModule { }
