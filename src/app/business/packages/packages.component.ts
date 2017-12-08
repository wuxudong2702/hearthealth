import {Component, OnInit} from '@angular/core';
import {
  cell, SortDirection, sortObj, DataType, INPUTTYPE,
  paginationObj, searchObj
} from '../../shared/table/table-list.component';
import {ApiService} from '../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';
import {ToastService} from '../../shared/toast/toast.service';
import {ToastConfig, ToastType} from '../../shared/toast/toast-model';
import {componentFactoryName} from "@angular/compiler";


@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css'],
  providers:[]
})
export class PackagesComponent implements OnInit {

  constructor(private http: ApiService, private toastService: ToastService) {
  }

  ngOnInit() {
      if(this.http.hasToken()){
          this.headers = this.http.getHeader('app-upgrades');
          this.getHeartData(this.url, this.per_page, '1', this.find_key, this.find_val, this.sort_key, this.sort_val);
          this.http.isHavePerm('app-upgrade-del').then(v => {
              this.deleteBtn = v;
              this.deleteAllBtn = v;
          });
          this.http.isHavePerm('app-upgrade-edit').then(v => {
              this.editBtn = v;
          });
          this.http.isHavePerm('app-upgrade-add').then(v => {
              this.addBtn = v;
          });
      }
  }

  headers: Array<cell> = [];
  data: Array<any> = [];
  headerAdd: Array<cell> = [];
  editId: number;
  addEditTitle: string = '添加';
  addView: boolean = false;
  uploadView: boolean = false;
  tableView: boolean = true;

  deleteBtn: boolean = false;
  deleteAllBtn: boolean = false;
  addBtn: boolean = false;
  editBtn: boolean = false;
  searchBtn: boolean = true;
  setBtn: boolean = true;
  uploadBtn: boolean = true;

  setOperate: boolean = true;
  paginationBtn: boolean = true;
  flag:boolean=true;
  pagination: paginationObj = new paginationObj();
  per_page: string = null;
  find_key: string = null;
  find_val: string = null;
  sort_key: string = null;
  sort_val: string = null;
  url: string = '/api/admin/upgrade/index';

  del(packages_id:string){
    // console.log(packages_id,'0-0-0-0');
      this.http.packagesDel(packages_id).then(data => {
          if (data['status'] == 'ok') {
            this.getHeartData(this.url, this.per_page, '1', this.find_key, this.find_val, this.sort_key, this.sort_val);

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
      this.http.packagesDel('' + arr[0]).then(data => {
        if (data['status'] == 'ok') {
          arr.splice(0, 1);
          if (arr.length) {
            this.delAll(arr);
          } else {
            this.getHeartData(this.url, this.per_page, '1', this.find_key, this.find_val, this.sort_key, this.sort_val);

            return;
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
  add(id: number) {
    if (id >= 0) {
      this.flag=false;
      this.addEditTitle = '编辑';
      this.editId = id;
      this.headerAdd = this.headers.map(d => {
        switch (d.input_type) {
          case INPUTTYPE.INPUT:
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
    }
    else {
      this.flag=true;
      this.addEditTitle = '添加';
      this.headerAdd = this.headers.map(d => {
        d.val = '';
        return d;
      });
    }
    this.addView = true;
    this.uploadView = false;
    this.tableView = false;
  }

  cancel() {
    this.addView = false;
    this.uploadView = false;
    this.tableView = true;
  }

  submit(submitData) {
    if(this.flag){
      this.http.upgradeAdd(submitData.ver,submitData.desc,submitData.url).then(data => {
        if (data['status'] == 'ok') {
          this.data = data['data'];
          this.getHeartData(this.url, this.per_page, '1', this.find_key, this.find_val, this.sort_key, this.sort_val);

          this.addView = false;
          this.uploadView = false;
          this.tableView = true;
        } else {
          const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
          this.toastService.toast(toastCfg);
        }
      }).catch(err => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
        this.toastService.toast(toastCfg);
      });
    }else{
      this.http.upgradeUpdate( ''+this.data[this.editId]['id'],submitData.ver,submitData.desc,submitData.url).then(data => {
        if (data['status'] == 'ok') {
          this.data = data['data'];
          this.getHeartData(this.url, this.per_page, '1', this.find_key, this.find_val, this.sort_key, this.sort_val);

          this.addView = false;
          this.uploadView = false;
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
  }


  sort(sort: sortObj) {
    this.sort_key = sort.key;
    this.sort_val = sort.val;
    this.getHeartData(this.url, this.per_page, '1', this.find_key, this.find_val, this.sort_key, this.sort_val);
  }

  search(searchObj: searchObj) {
    this.find_val = searchObj.searchValue;
    this.find_key = searchObj.selectValue;
    this.getHeartData(this.url, this.per_page,'1', this.find_key, this.find_val, this.sort_key, this.sort_val);
  }
  set (set: string) {
    this.http.setHeader('app-upgrades', set).then(v => v).then(w => {
      this.headers = this.http.getHeader('app-upgrades');
    });
  }
  paginationChange(parmas) {
    this.per_page = parmas['per_page'];
    this.getHeartData( this.url, this.per_page, parmas['page'], this.find_key, this.find_val, this.sort_key, this.sort_val);
  }

  upload(data){
    console.log(data,'data');
    this.uploadView = true;
    this.addView = false;
    this.tableView = false;
  }

  getHeartData(url: string = this.url, per_page: string = this.per_page, page:string = '1', find_key: string = this.find_key, find_val: string = this.find_val, sort_key: string = this.sort_key, sort_val: string = this.sort_val) {
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

}
