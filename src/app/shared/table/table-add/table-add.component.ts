import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {cell} from '../table-list.component';
import {DatepickerI18n, DatepickerI18nType} from '../../datepickerI18n/datepickerI18n';
import {NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormControlService} from "./form-controll.service"
import {ShareService} from "./input/share.service";
import {FileUploader} from "ng2-file-upload";

@Component({
  selector: 'app-table-add',
  templateUrl: './table-add.component.html',
  styleUrls: ['./table-add.component.css'],
  providers: [ShareService, DatepickerI18nType, FormControlService, {provide: NgbDatepickerI18n, useClass: DatepickerI18n}]
})
export class TableAddComponent implements OnInit {

  @Input() tableAdd: boolean;
  @Input() flag: boolean;

  @Input() isShow: boolean = true;
  @Input() isShowTittle: boolean = true;
  @Input() headers: Array<cell>;
  @Input() addEditTitle: string;
  @Input() isRemind: boolean;
  @Input() remind: Array<any>;
  @Input() treeAdd: boolean;



  @Output() onAddCancel = new EventEmitter<any>();
  @Output() onSubmit = new EventEmitter<any>();
  @Output() onSendRemind = new EventEmitter<any>();
  @Output() onSendFormValue = new EventEmitter<any>();

  submitData: string;
  addFormValue: string;
  checkValue: boolean = false;
  matchUnValid: boolean = false;
  form: FormGroup;



  constructor(private fcs: FormControlService, private service: ShareService) {
  }

  ngOnInit() {
     this.form = this.fcs.toFormGroup(this.headers);

  }

  datePickerConfig = {
    locale: 'zh-CN'
  };

  submit() {
    // this.form.push();
    console.log(this.form,this.form.value, 'this.form.value');
    if (this.form.value.sex =='男') {
      this.form.value.sex = '1';
    } else {
      this.form.value.sex = '2'
    }
    if (this.form.value.default =='设为默认下载包') {
      this.form.value['default'] = '1';
    } else {
      this.form.value['default'] = '0'
    }
    console.log(this.form.value['default']);
    for (let i in this.form.value) {
      if (!this.form.value[i]) {
        // console.log(!this.form.value[i],'!this.form.value[i]');
        this.form.value[i] = undefined;
      }
    }
    this.onSubmit.emit(this.form.value);
  }

  sendRemind(remind) {
    this.onSendRemind.emit(remind);
  }

  SendFormValue(formValue) {
    this.onSendFormValue.emit(formValue);
    this.service.formValMission(formValue);
  }
  sendMatchValid(matchUnValid) {
    this.matchUnValid = matchUnValid;
  }

  addCancel() {
    this.onAddCancel.emit();
  }

}



