import {Component, OnInit} from '@angular/core';
import {
  cell,
  SortDirection,
  sortObj,
  DataType,
  INPUTTYPE,
  searchObj,
  paginationObj
} from '../../../shared/table/table-list.component';
import {HttpClient} from "@angular/common/http";
import {ApiService} from '../../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';
import {ToastService} from '../../../shared/toast/toast.service';
import {ToastConfig, ToastType} from '../../../shared/toast/toast-model';
import {ConfirmConfig} from '../../../shared/modal/modal-model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css'],
  providers: []
})

export class AdminUserComponent implements OnInit {

  constructor(private router: Router, private http: ApiService, private toastService: ToastService) {

  }

  ngOnInit() {
    this.headers = this.http.getHeader('admins');
    this.getHeartData(this.url);
    console.log(this.headers, this.data);
    this.http.isHavePerm('admin-user-del').then(v => {
      this.deleteBtn = v;
      this.deleteAllBtn = v;
    });
    this.http.isHavePerm('admin-user-edit').then(v => {
      this.editBtn = v;
    });
    this.http.isHavePerm('admin-user-add').then(v => {
      this.addBtn = v;
    });
  }

  nodes: any;
  headers: Array<cell> = [];
  headerAdd: Array<any> = [];
  data: Array<any> = [];
  remind: Array<any> = [];
  addEditTitle: string = '添加';
  role_id: string;
  editId: number;
  flag: boolean = true;

  // adminUserDel: boolean =false;// this.http.isHavePerm('admin-user-del');
  // adminUserAdd: boolean = false;//this.http.isHavePerm('admin-user-add');
  // adminUserEdit: boolean = false;//this.http.isHavePerm('admin-user-edit');
  // deleteBtn: boolean = this.adminUserDel;
  // deleteAllBtn: boolean = this.adminUserDel;
  // addBtn: boolean = this.adminUserAdd;
  // editBtn: boolean = this.adminUserEdit;
  deleteBtn: boolean = false;
  deleteAllBtn: boolean = false;
  addBtn: boolean = false;
  editBtn: boolean = false;
  setOperate: boolean = true;
  paginationBtn: boolean = true;
  searchBtn: boolean = true;
  setBtn: boolean = true;

  tableView: boolean = true;
  addView: boolean = false;

  pagination: paginationObj = new paginationObj();
  per_page: string = null;
  find_key: string = null;
  find_val: string = null;
  sort_key: string = null;
  sort_val: string = null;
  url: string = '/api/admin/admins/index';

  add(id: number) {
    for (let i = 0; i < this.headers.length; i++) {
        this.headers[i].show = true;
        this.headers[i].required = true;
    }
    if (id >= 0) {
      for (let i = 0; i < this.headers.length; i++) {
          this.headers[i].required = false;
      }
      this.flag = false;
      this.addEditTitle = '编辑';
      this.editId = id;
      this.headerAdd = this.headers.map(d => {
        switch (d.input_type) {
          case INPUTTYPE.INPUT:
            d.val = this.data[id][d.key];
            break;
          case INPUTTYPE.REMINDINPUT:
            d.val = this.data[id][d.key];
            break;
          case INPUTTYPE.SELECT:
            let val = this.data[id][d.key];
            d.val = d.select_val[val];
            break;
          default:
            d.val = this.data[id][d.key];
        }

        return d;
      });
    } else {
      this.flag = true;
      this.addEditTitle = '添加';
      this.headerAdd = this.headers.map(d => {
        d.val = '';
        return d;
      });
      console.log(this.headerAdd, 'headerAdd----');
    }
    this.addView = true;
    this.tableView = false;

  }

  submit(submitData) {
    console.log(submitData, 'submitData');
    console.log(this.role_id, 'this.role_id');
    if (submitData.password_confirmation == submitData.password) {
      if (this.role_id) {
          if (this.flag) {
              this.http.adminsAdd(this.role_id, submitData.user_name, submitData.name, submitData.password).then(data => {
                  if (data['status'] == 'ok') {
                      this.data = data['data'];
                      this.getHeartData();
                      for (let i = 0; i < this.headers.length; i++) {
                          if (this.headers[i].key == 'password_confirmation' || this.headers[i].key == 'password' || this.headers[i].key == 'name') {
                              this.headers[i].show = false;
                              this.headers[i].required = false;
                          }
                      }
                      this.addView = false;
                      this.tableView = true;
                  } else {
                      const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
                      this.toastService.toast(toastCfg);
                  }
              }).catch(err => {
                  const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
                  this.toastService.toast(toastCfg);
              });
          } else {
              this.http.adminsUpdate('' + this.data[this.editId]['id'], this.role_id, submitData.user_name, submitData.name, submitData.password).then(data => {
                  console.log(data);
                  if (data['status'] == 'ok') {
                      this.data = data['data'];
                      this.getHeartData();
                      for (let i = 0; i < this.headers.length; i++) {
                          if (this.headers[i].key == 'password_confirmation' || this.headers[i].key == 'password' || this.headers[i].key == 'name') {
                              this.headers[i].show = false;
                              this.headers[i].required = false;
                          }
                      }
                      this.addView = false;
                      this.tableView = true;
                  } else {
                      const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
                      this.toastService.toast(toastCfg);
                  }
              }).catch(err => {
                  const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
                  this.toastService.toast(toastCfg);
              });
          }
      }else{
          const toastCfg = new ToastConfig(ToastType.ERROR, '', '管理员角色不存在！', 3000);
          this.toastService.toast(toastCfg);
      }
    } else {
      const toastCfg = new ToastConfig(ToastType.ERROR, '', '密码不一致！', 3000);
      this.toastService.toast(toastCfg);
    }
  }

  getHeartData(url: string = this.url, per_page: string = this.per_page, find_key: string = this.find_key, find_val: string = this.find_val, sort_key: string = this.sort_key, sort_val: string = this.sort_val) {
    this.http.getData(url, per_page, find_key, find_val, sort_key, sort_val).then(data => {
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
    if (parmas['url'] != undefined) {
      this.url = parmas['url'];
    }
    this.getHeartData(this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
  }

  sort(sort: sortObj) {
    this.sort_key = sort.key;
    this.sort_val = sort.val;
    this.getHeartData(this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
  }

  set (set: string) {
    this.http.setHeader('admins', set).then(v => v).then(w => {
      this.headers = this.http.getHeader('admins');
    });
  }

  search(searchObj: searchObj) {
    this.find_val = searchObj.searchValue;
    this.find_key = searchObj.selectValue;
    this.getHeartData(this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
  }

  del(id: string) {
    this.http.adminsDel(id).then(data => {
      if (data['status'] == 'ok') {
        this.getHeartData();
      } else {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
        this.toastService.toast(toastCfg);
      }
    }).catch(err => {
      const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
      this.toastService.toast(toastCfg);
    });
  }

  delAll(arr: Array<any>) {
    if (arr.length) {
      this.http.adminsDel('' + arr[0]).then(data => {
        if (data['status'] == 'ok') {
          arr.splice(0, 1);
          if (arr.length) {
            this.delAll(arr);
          } else {
            this.getHeartData(this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
          }
        } else {
          const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
          this.toastService.toast(toastCfg);
          return;
        }
      }).catch(err => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
        this.toastService.toast(toastCfg);
      });
    }
  }

  cancel() {
    for (let i = 0; i < this.headers.length; i++) {
      if (this.headers[i].key == 'password_confirmation' || this.headers[i].key == 'password' || this.headers[i].key == 'name'|| this.headers[i].key == 'role_id') {
        this.headers[i].show = false;
      }
    }
    this.addView = false;
    this.tableView = true;
  }

  getRoleId(role_id) {
    this.role_id = role_id;
  };
}


