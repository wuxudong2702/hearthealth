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
  @Input() isShow: boolean = true;
  @Input() headers: Array<cell>;
  @Input() addEditTitle: string;
  @Input() isRemind: boolean;
  @Input() remind: Array<any>;


  @Output() onAddCancel = new EventEmitter<any>();
  @Output() onSubmit = new EventEmitter<any>();
  @Output() onSend = new EventEmitter<any>();
  @Output() onSendFormValue = new EventEmitter<any>();

  submitData: string;
  addFormValue: string;
  checkValue: boolean = false;
  form: FormGroup;

  constructor(private fcs: FormControlService) {
  }

  ngOnInit() {

    this.form = this.fcs.toFormGroup(this.headers);
  }

  datePickerConfig = {
    locale: 'zh-CN'
  };

  submit() {
    console.log(this.form.value, 'this.form.value');
    if (this.form.value.sex = '男') {
      this.form.value.sex = '1';
    } else {
      this.form.value.sex = '0'
    }
    for (let i in this.form.value) {
      if (!this.form.value[i]) {
        this.form.value[i] = undefined;
      }
    }
    this.onSubmit.emit(this.form.value);
  }

  sendId(role_id) {
    this.onSend.emit(role_id);
  }

  SendFormValue(formValue) {
    this.onSendFormValue.emit(formValue);
  }

  addCancel() {
    this.onAddCancel.emit();
  }

}



