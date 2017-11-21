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
  @Output() onSendId = new EventEmitter<any>();
  @Output() onSendFormValue = new EventEmitter<any>();

  isRemind:boolean = false;
  remind:Array<any>=[];
  role_id:string;
  formValue:string;

  change(){
      this.formValue = this.form.value;
      this.onSendFormValue.emit(this.formValue);
      if(this.field.key=='role_name'){
          console.log(this.field.val,'输入的值');
          this.isRemind = true;
          this.http.adminsRemind(this.field.val).then(data => {
              console.log(data,'data');
              if (data['status'] == 'ok') {
                  this.remind = data['data'].map( k =>{
                      if(this.field.val==k.name){
                        this.role_id = k.id;
                        this.onSendId.emit(this.role_id);
                      }
                      return k.name;
                  });
                  console.log(this.remind,'remind------------');

              } else {
                  const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
                  this.toastService.toast(toastCfg);
              }
          }).catch(err => {
              const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
              this.toastService.toast(toastCfg);
          });
      }
  }

  @Output() onDate = new EventEmitter<any>();

  date = '';

  get isValid() {
    return this.form.controls[this.field.key].valid;
  }

  get isDirty(){
    return this.form.controls[this.field.key].dirty;
  }

  constructor(private http: ApiService,private toastService: ToastService) {
  }

  ngOnInit() {
    // console.log('add and edit field ',this.field)
  }

  dateSelected(date){
    console.log(date, '21212121');
    this.onDate.emit(this.date);
  }

  datePickerConfig = {
    locale: 'zh-CN',
    format:"YYYY-MM-DD"
  };

}
