import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {cell} from '../table-list.component';
import {DatepickerI18n, DatepickerI18nType} from '../../datepickerI18n/datepickerI18n';
import {NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormControlService} from "./form-controll.service"

@Component({
  selector: 'app-table-add',
  templateUrl: './table-add.component.html',
  styleUrls: ['./table-add.component.css'],
  providers: [DatepickerI18nType, FormControlService, {provide: NgbDatepickerI18n, useClass: DatepickerI18n}]
})
export class TableAddComponent implements OnInit {

  @Input() tableAdd: boolean;
  @Input() headers: Array<cell>;
  @Input() addEditTitle:string;


  @Output() onAddCancle = new EventEmitter<any>();
  @Output() onSubmit = new EventEmitter<any>();

  submitData: string;
  checkValue: boolean = false;
  form: FormGroup;

  constructor(private fcs:FormControlService) {
  }

  ngOnInit() {

    this.form=this.fcs.toFormGroup(this.headers);
}

  datePickerConfig = {
    locale: 'zh-CN'
  };

  submit() {
    this.submitData=JSON.stringify(this.form.value);
    this.onSubmit.emit(this.submitData);
  }

  addCancle() {
    this.onAddCancle.emit();
  }

}



