import { Component, OnInit } from '@angular/core';
import {cell, SortDirection, sortObj,DataType,searchObj,paginationObj} from '../../shared/table/table-list.component';
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
          this.getHeartData(this.url);
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
  per_page: string=null;
  find_key: string=null;
  find_val: string=null;
  sort_key: string=null;
  sort_val: string=null;
  url: string = '/api/admin/log/index';



    getHeartData(url: string = this.url, per_page: string = this.per_page,  page:string = '1', find_key: string = this.find_key, find_val: string = this.find_val, sort_key: string = this.sort_key, sort_val: string = this.sort_val) {
        this.http.getData(url, per_page, page, find_key, find_val, sort_key, sort_val).then(data => {
            if (data['status'] == 'ok') {
                this.data = data['data']['data'];
                this.pagination.current_page = data['data']['current_page'];
                this.pagination.last_page = data['data']['last_page'];
                this.pagination.per_page = data['data']['per_page'];
                this.pagination.total = data['data']['total'];
                this.pagination.first_page_url = data['data']['first_page_url'];
                this.pagination.last_page_url = data['data']['last_page_url'];
                this.pagination.next_page_url = data['data']['next_page_url'];
                this.pagination.prev_page_url = data['data']['prev_page_url'];
                this.pagination.to = data['data']['to'];
                // console.log(this.pagination,'pagination======');
            } else {
                const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
                this.toastService.toast(toastCfg);
            }
        }).catch(err => {
            const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
            this.toastService.toast(toastCfg);
        });
    }

    paginationChange(parmas) {
        this.per_page = parmas['per_page'];
        this.getHeartData( this.url, this.per_page, parmas['page'], this.find_key, this.find_val, this.sort_key, this.sort_val);
    }

    sort(sort: sortObj) {
        this.sort_key = sort.key;
        this.sort_val = sort.val;
        this.getHeartData(this.url, this.per_page, '1', this.find_key, this.find_val, this.sort_key, this.sort_val);
    }

    set (set: string) {
        this.http.setHeader('logs', set).then(v => v).then(w => {
            this.headers = this.http.getHeader('logs');
        });
    }

    search(searchObj: searchObj) {
        this.find_val = searchObj.searchValue;
        this.find_key = searchObj.selectValue;
        this.getHeartData(this.pagination.first_page_url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
    }
}
