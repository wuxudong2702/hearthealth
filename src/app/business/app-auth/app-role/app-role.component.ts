import {Component, OnInit} from '@angular/core';
import {
  cell,
  SortDirection,
  sortObj,
  searchObj,
  paginationObj,
  DataType,
  INPUTTYPE, params
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
      this.params['page']='1';
      this.getHeartData(this.url,this.params);
        this.http.isHavePerm('app-role-edit').then(v => {
            this.editBtn = v;
        });
    }
  }

  headers:  Array <cell>  = [];
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
  url: string = '/api/admin/app/role/index';
  params:params=new params();
  add(id: number) {
    this.id = this.data[id]['id'];
    this.editId = id;
    this.headerAdd = this.headers.map(d => {
      switch (d.input_type) {
        case INPUTTYPE.INPUT:
          d.val = ''+this.data[id][d.key];
          break;
        default:
          d.val = this.data[id][d.key];
      }
      return d;
    });
    console.log(this.headerAdd,'headeradd');
    // for (let i = 0; i < this.headerAdd.length; i++) {
    //   if (this.headerAdd[i].key == 'name') {
    //     this.headerAdd[i].show = false;
    //   }
    // }
    this.addView = true;
    this.tableView = false;
  }

  cancel() {
    this.addView = false;
    this.tableView = true;
     
  }

  submit(submitData) {
    this.http.appRoleSubmit(this.id, submitData.users_count).then(data => {
      if (data['status'] == 'ok') {
        this.data = data['data'];
        this.params['page']='1';
        this.getHeartData(this.url,this.params);
        this.addView = false;
        this.tableView = true;
        // for (let i = 0; i < this.headers.length; i++) {
        //   if (this.headers[i].key == 'name') {
        //     this.headers[i].show = true;
        //   }
        // }
      } else {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
        this.toastService.toast(toastCfg);
      }
    }).catch(err => {
      const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
      this.toastService.toast(toastCfg);
    });
  }


  set (set: string) {
    this.http.setHeader('app-roles', set).then(v => v).then(w => {
      this.headers = this.http.getHeader('app-roles');
    });
  }

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
}
