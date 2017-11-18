import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {
  cell,
  SortDirection,
  sortObj,
  DataType,
  searchObj,
  paginationObj
} from '../../shared/table/table-list.component';
import {ApiService} from '../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';
import {ToastConfig, ToastType} from "../../shared/toast/toast-model";
import {ToastService} from '../../shared/toast/toast.service';

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.css'],
  providers: []
})
export class DevComponent implements OnInit {

  constructor(private http: ApiService, private toastService: ToastService, private router: Router) {
  }

  ngOnInit() {
    this.headers = this.http.getHeader('devs');
    this.getHeartData();

    this.http.isHavePerm('heart-dev-del').then(v => {
      this.deleteBtn = v;
      this.deleteAllBtn = v;
    });

  }

  headers: Array<cell> = [];
  headerAdd: Array<cell> = [];
  data: Array<any> = [];
  addEditTitle: string = '添加';

  devDel: boolean = false;//this.http.isHavePerm('heart-dev-del');
  devAdd: boolean = false;// this.http.isHavePerm('heart-dev-add');
  deleteBtn: boolean = this.devDel;
  deleteAllBtn: boolean = this.devDel;
  addBtn: boolean = this.devAdd;

  searchBtn: boolean = true;
  setBtn: boolean = true;
  paginationBtn: boolean = true;
  setOperate: boolean = true;

  tableView: boolean = true;
  addView: boolean = false;
  pagination: paginationObj = new paginationObj();

  per_page: string = null;
  find_key: string = null;
  find_val: string = null;
  sort_key: string = null;
  sort_val: string = null;
  url: string = '/api/admin/dev/index';


  add() {
    this.addView = true;
    this.tableView = false;
  }

  del(dev_id: string) {
    this.http.unbind(dev_id).then(data => {
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

  submit(AddData: string) {
    this.http.postDevSubmit(AddData).then(data => {
      this.data = data['data'];
    });
    this.addView = false;
    this.tableView = true;
  }

  cancel() {
    this.addView = false;
    this.tableView = true;
  }


  sort(sort: sortObj) {
    this.sort_key = sort.key;
    this.sort_val = sort.val;
    this.getHeartData(this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
  }

  search(searchObj: searchObj) {
    this.find_val = searchObj.searchValue;
    this.find_key = searchObj.selectValue;
    this.getHeartData(this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
  }


  paginationChange(parmas) {
    this.per_page = parmas['per_page'];
    if(parmas['url']!=undefined){
      this.url = parmas['url'];
    }
    this.getHeartData( this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
  }

  set (set: string) {
    this.http.setHeader('devs', set).then(v => v).then(w => {
      this.headers = this.http.getHeader('devs');
    });
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


}
