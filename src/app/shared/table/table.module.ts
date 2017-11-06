import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PaginationModule} from '../pagination/pagination.module';
import {CPipePipe, TableListComponent} from './table-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule,
  ],
  declarations: [
    CPipePipe,
    TableListComponent
  ],
  exports: [TableListComponent],
  providers: []
})
export class UserModule {
}
