import {Component, OnInit} from '@angular/core';
import {
  cell,
  SortDirection,
  sortObj,
  searchObj,
  paginationObj,
  DataType,
  INPUTTYPE
} from '../../../shared/table/table-list.component';
import {ApiService} from '../../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';
import {ToastService} from '../../../shared/toast/toast.service';
import {ToastConfig, ToastType} from '../../../shared/toast/toast-model';

@Component({
  selector: 'app-app-role',
  templateUrl: './app-role.component.html',
  styleUrls: ['./app-role.component.css'],
  providers: []

})
export class AppRoleComponent implements OnInit {

  constructor(private http: ApiService, private toastService: ToastService) {
  }

  ngOnInit() {
    if(this.http.hasToken()){
        this.headers = this.http.getHeader('app-roles');
        this.getHeartData(this.url);
        this.http.isHavePerm('app-role-edit').then(v => {
            this.editBtn = v;
        });
    }
  }

  headers: Array<cell> = [];
  headerAdd: Array<cell> = [];
  data: Array<any> = [];
  editId: number;
  addEditTitle: string = '编辑';
  id: string = '';

  editBtn: boolean = false;
  setOperate: boolean = true;
  searchBtn: boolean = true;
  setBtn: boolean = true;
  paginationBtn: boolean = true;
  addView: boolean = false;
  tableView: boolean = true;
  pagination: paginationObj = new paginationObj();

  per_page: string = null;
  find_key: string = null;
  find_val: string = null;
  sort_key: string = null;
  sort_val: string = null;
  url: string = '/api/admin/app/role/index';

  add(id: number) {
    this.id = this.data[id]['id'];
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
    for (let i = 0; i < this.headerAdd.length; i++) {
      if (this.headerAdd[i].key == 'name') {
        this.headerAdd[i].show = false;
      }
    }
    this.addView = true;
    this.tableView = false;
  }

  cancel() {
    this.addView = false;
    this.tableView = true;
    for (let i = 0; i < this.headers.length; i++) {
      if (this.headers[i].key == 'name') {
        this.headers[i].show = true;
      }
    }
  }

  submit(submitData) {
    this.http.appRoleSubmit(this.id, submitData.users_count).then(data => {
      if (data['status'] == 'ok') {
        this.data = data['data'];
        this.getHeartData(this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
        this.addView = false;
        this.tableView = true;
        for (let i = 0; i < this.headers.length; i++) {
          if (this.headers[i].key == 'name') {
            this.headers[i].show = true;
          }
        }
      } else {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
        this.toastService.toast(toastCfg);
      }
    }).catch(err => {
      const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
      this.toastService.toast(toastCfg);
    });
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

  set (set: string) {
    this.http.setHeader('app-roles', set).then(v => v).then(w => {
      this.headers = this.http.getHeader('app-roles');
    });
  }

  paginationChange(parmas) {
    this.per_page = parmas['per_page'];
    if (parmas['url'] != undefined) {
      this.url = parmas['url'];
    }
    this.getHeartData(this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
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
