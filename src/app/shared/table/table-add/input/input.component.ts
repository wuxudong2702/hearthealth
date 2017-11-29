import {Component, Input, OnInit, Output,EventEmitter} from '@angular/core';
import {cell} from "../../table-list.component";
import {FormGroup} from '@angular/forms';
import {ApiService} from '../../../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';
import {ToastService} from '../../../toast/toast.service';
import {ToastConfig, ToastType} from '../../../toast/toast-model';
import {ConfirmConfig} from '../../../modal/modal-model';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() field: cell;
  @Input() form: FormGroup;
  @Input() AddInput: boolean;
  @Input() treeAdd: boolean;
  @Output() onSendId = new EventEmitter<any>();
  @Output() onSendRemind = new EventEmitter<any>();
  @Output() onSendFormValue = new EventEmitter<any>();
  @Output() onDate = new EventEmitter<any>();

  date = '';
  isRemind:boolean = false;
  userEditFlag:boolean = false;
  remind:Array<any>=[];
  role_id:string;
  formValue:string;

  change(){
      this.formValue = this.form.value;
      // console.log(this.formValue,'this.formValue');
      this.onSendFormValue.emit(this.formValue);
      if(this.field.key=='role_name'){
          this.isRemind = true;
          this.userEditFlag = true;
          this.http.adminsRemind(this.formValue['role_name']).then(data => {
              if (data['status'] == 'ok') {
                  this.remind = data['data'].map( k =>{
                      return k.name;
                  });
                  this.onSendRemind.emit({
                      remind:data['data'],
                      userEditFlag:this.userEditFlag
                  });
              } else {
                  const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
                  this.toastService.toast(toastCfg);
              }
              this.userEditFlag = false;
          }).catch(err => {
              const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
              this.toastService.toast(toastCfg);
          });
      }
  }

  get isValid() {
    // console.log(this.form.controls[this.field.key].valid,this.field.key);
    return this.form.controls[this.field.key].valid;
  }

  get isDirty(){
    return this.form.controls[this.field.key].dirty;
  }

  constructor(private http: ApiService,private toastService: ToastService) {
  }

  ngOnInit() {}

  datePickerConfig = {
    locale: 'zh-CN',
    format:"YYYY-MM-DD"
  };
}
