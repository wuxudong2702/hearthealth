import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {
  cell,
  SortDirection,
  sortObj,
  DataType,
  searchObj,
  paginationObj,
  params
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
    if(this.http.hasToken()){
      this.headers = this.http.getHeader('devs');
      this.params['page']='1';
      this.getHeartData(this.url,this.params);
      this.http.isHavePerm('heart-dev-del').then(v => {
        this.unBindBtn = v;
        this.unBindAllBtn = v;
      });
    }
  }

  headers: Array<cell> = [];
  headerAdd: Array<cell> = [];
  data: Array<any> = [];
  addEditTitle: string = '添加';

  devDel: boolean = false;
  devAdd: boolean = false;
  unBindBtn: boolean = this.devDel;
  unBindAllBtn: boolean = this.devDel;
  addBtn: boolean = this.devAdd;

  searchBtn: boolean = true;
  setBtn: boolean = true;
  paginationBtn: boolean = true;
  setOperate: boolean = true;

  tableView: boolean = true;
  addView: boolean = false;
  pagination: paginationObj = new paginationObj();
  params:params=new params();

  url: string = '/api/admin/dev/index';


  del(dev_id: string) {
    this.http.unbind(dev_id).then(data => {
      if (data['status'] == 'ok') {
        this.params['page']='1';
        this.getHeartData(this.url, this.params);
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
      this.http.unbind('' + arr[0]).then(data => {
        if (data['status'] == 'ok') {
          arr.splice(0, 1);
          if (arr.length) {
            this.delAll(arr);
          } else {
            this.params['page']='1';
            this.getHeartData(this.url, this.params);
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

  set (set: string) {
    console.log("set",set);
    this.http.setHeader('devs',set ).then(v => v).then(w => {
      this.headers = this.http.getHeader('devs');
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

// getHeartData(url: string = this.url, per_page: string = this.per_page, page:string = '1',
  //              find_key: string = this.find_key, find_val: string = this.find_val,
  //              sort_key: string = this.sort_key, sort_val: string = this.sort_val) {
  //   this.http.getData(url, per_page, page, find_key, find_val, sort_key, sort_val).then(data => {
  //     if (data['status'] == 'ok') {
  //       this.data = data['data']['data'];
  //       this.pagination.current_page = data['data']['current_page'];
  //       this.pagination.last_page = data['data']['last_page'];
  //       this.pagination.per_page = data['data']['per_page'];
  //       this.pagination.total = data['data']['total'];
  //       this.pagination.first_page_url = data['data']['first_page_url'];
  //       this.pagination.last_page_url = data['data']['last_page_url'];
  //       this.pagination.next_page_url = data['data']['next_page_url'];
  //       this.pagination.prev_page_url = data['data']['prev_page_url'];
  //       this.pagination.to = data['data']['to'];
  //     } else {
  //       const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
  //       this.toastService.toast(toastCfg);
  //     }
  //   }).catch(err => {
  //     const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
  //     this.toastService.toast(toastCfg);
  //   });
  // }

}
