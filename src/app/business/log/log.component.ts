import { Component, OnInit } from '@angular/core';
import {
  cell, SortDirection, sortObj, DataType, searchObj, paginationObj,
  params
} from '../../shared/table/table-list.component';
import {ApiService} from '../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';
import {ToastService} from '../../shared/toast/toast.service';
import {ToastConfig, ToastType} from '../../shared/toast/toast-model';
import {ConfirmConfig} from '../../shared/modal/modal-model';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css'],
  providers:[]
})
export class LogComponent implements OnInit {

  constructor(private http: ApiService,private toastService: ToastService) {}

  ngOnInit() {
      if(this.http.hasToken()){
          this.headers= this.http.getHeader('logs');

        this.params['page']='1';
        this.getHeartData(this.url,this.params);
      }
  }

  // setOperate
  headers: Array<cell> = [];
  data: Array<any> = [];
  searchBtn: boolean = true;
  setBtn: boolean = true;
  paginationBtn: boolean = true;
  setOperate: boolean = false;

  pagination: paginationObj = new paginationObj();

  url: string = '/api/admin/log/index';
  params:params=new params();
  sort(sort: sortObj) {
    this.params['sort_key'] = sort.key;
    this.params['sort_val'] = sort.val;
    this.getHeartData(this.url,this.params);
  }

  search(searchObj: searchObj) {
    this.params['find_key']=searchObj.selectValue;
    this.params['find_val']=searchObj.searchValue;
    this.params['page']='1';
    this.getHeartData(this.url,this.params);
  }

  paginationChange(params) {
    this.params['page']=params['page'];
    this.params['count'] =params['per_page'];
    this.getHeartData(this.url,this.params);
  }

  getHeartData(url,params){
    this.http.getTableData(url,params).then(data => {
      if (data['status'] == 'ok') {
        this.data = data['data'];
        this.pagination =data['pagination'];
      } else {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', data['message'], 3000);
        this.toastService.toast(toastCfg);
      }
    }).catch(err => {
      const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
      this.toastService.toast(toastCfg);
    });
  }

    set (set: string) {
        this.http.setHeader('logs', set).then(v => v).then(w => {
            this.headers = this.http.getHeader('logs');
        });
    }


}
