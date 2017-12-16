import {Component, OnInit} from '@angular/core';
import {
  cell, SortDirection, sortObj, DataType, INPUTTYPE,
  paginationObj, searchObj, params
} from '../../shared/table/table-list.component';
import {ApiService} from '../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';
import {ToastService} from '../../shared/toast/toast.service';
import {ToastConfig, ToastType} from '../../shared/toast/toast-model';
import {HttpClient, HttpEventType, HttpRequest, HttpResponse} from "@angular/common/http";
import {isNullOrUndefined} from "util";


@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css'],
  providers: []
})
export class PackagesComponent implements OnInit {

  constructor(private http: ApiService, private toastService: ToastService, private httpClient: HttpClient) {
  }

  ngOnInit() {
    if (this.http.hasToken()) {
      this.headers = this.http.getHeader('app-upgrades');
      this.params['page']='1';
      this.getHeartData(this.url,this.params);
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
  cancel_disabled: boolean = false;

  deleteBtn: boolean = false;
  deleteAllBtn: boolean = false;
  addBtn: boolean = false;
  editBtn: boolean = false;
  searchBtn: boolean = true;
  setBtn: boolean = true;
  uploadBtn: boolean = true;


  setOperate: boolean = true;
  paginationBtn: boolean = true;
  flag: boolean = true;
  pagination: paginationObj = new paginationObj();
  url: string = '/api/admin/upgrade/index';
  params:params=new params();
  progress: number;

  del(packages_id: string) {
    // console.log(packages_id,'0-0-0-0');
    this.http.packagesDel(packages_id).then(data => {
      if (data['status'] == 'ok') {
        this.params['page']='1';
        this.getHeartData(this.url,this.params);
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
            this.params['page']='1';
            this.getHeartData(this.url,this.params);
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
      this.flag = false;
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
      for (let i = 0; i < this.headerAdd.length; i++) {
        if (this.headerAdd[i].key == 'ver'||this.headerAdd[i].key == 'default') {
          this.headerAdd[i].required = false;
        }
        if(this.headerAdd[i].key == 'app'){
          this.headerAdd[i].show=true;
        }
      }
    }
    else {
      this.flag = true;
      this.addEditTitle = '添加';
      this.headerAdd = this.headers.map(d => {
        d.val = '';
        return d;
      });
      for (let i = 0; i < this.headerAdd.length; i++) {
        if (this.headerAdd[i].key == 'ver'||this.headerAdd[i].key == 'default') {
          this.headerAdd[i].required = true;
        }
        if(this.headerAdd[i].key == 'app'){
          this.headerAdd[i].show=true;
        }
      }
    }
    this.addView = true;
    this.uploadView = false;
    this.tableView = false;
  }

  cancel() {
    this.addView = false;
    this.uploadView = false;
    this.tableView = true;
    this.flag=true;
    // for (let i = 0; i < this.headerAdd.length; i++) {
    //   if(this.headerAdd[i].key == 'app'){
    //     this.headerAdd[i].show=false;
    //   }
    // }
  }

  submit(submitData) {
    let formData = new FormData();
    formData.append('app', submitData['app']);
    formData.append('ver', submitData['ver']);
    formData.append('desc', submitData['desc']);
    formData.append('token', this.http.getToken());
    formData.append('default', submitData['default']);
    if (this.flag) {
      console.log(submitData,formData,'-----');
      if(isNullOrUndefined(submitData['app'])){
        const toastCfg = new ToastConfig(ToastType.ERROR, '', '未选择APP包！', 3000);
        this.toastService.toast(toastCfg);
        return ;
      }
      const req = new HttpRequest('POST', "/api/admin/upgrade/add", formData, {
        reportProgress: true,
      });
   // this.httpClient.request(req).
      this.httpClient.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
          // console.log(this.progress);
          if(this.progress<=100 &&  this.progress>0){
            this.cancel_disabled = true;
          }
        }
        else if (event instanceof HttpResponse) {
          if (event.body['status'] == 'ok') {
            this.addView = false;
            this.uploadView = false;
            this.tableView = true;
            this.flag=true;
            this.progress =0;
            this.cancel_disabled=false;
            for (let i = 0; i < this.headerAdd.length; i++) {
              if(this.headerAdd[i].key == 'app'){
                this.headerAdd[i].show=false;
              }
            }
            this.params['page']='1';
            this.getHeartData(this.url,this.params);
          } else {
            const toastCfg = new ToastConfig(ToastType.ERROR, '', event.body['message'], 3000);
            this.toastService.toast(toastCfg);
          }
        }
      });
    } else {
      formData.append('id', '' + this.data[this.editId]['id']);
      const req = new HttpRequest('POST', "api/admin/upgrade/update", formData, {
        reportProgress: true,
      });
      this.httpClient.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
            if(this.progress<=100 &&  this.progress>0){
                this.cancel_disabled = true;
            }
          // console.log(this.progress);
        }
        else if (event instanceof HttpResponse) {
          if (event.body['status'] == 'ok') {
            this.addView = false;
            this.uploadView = false;
            this.tableView = true;
            this.flag=true;
            this.progress =0;
            this.cancel_disabled=false;
            for (let i = 0; i < this.headerAdd.length; i++) {
              if(this.headerAdd[i].key == 'app'){
                this.headerAdd[i].show=false;
              }
            }
            this.params['page']='1';
            this.getHeartData(this.url,this.params);
            // console.log('Files uploaded!');
          } else {
            const toastCfg = new ToastConfig(ToastType.ERROR, '', event.body['message'], 3000);
            this.toastService.toast(toastCfg);
          }
        }
      });
    }
  }

  setDefault(id:string){
    let defaultData;
    for(let i=0;i<this.data.length;i++){
      if(this.data[i]['id']==id){
         defaultData=this.data[i];
      }
    }
    defaultData['default']=defaultData['default']=='0'? '1':'0';
    let formData = new FormData();
    formData.append('app', defaultData['app']);
    formData.append('ver', defaultData['ver']);
    formData.append('desc', defaultData['desc']);
    formData.append('token', this.http.getToken());
    formData.append('default', defaultData['default']);
    formData.append('id', ''+ id);
     // console.log(defaultData,'defaultData');
    const req = new HttpRequest('POST', "api/admin/upgrade/update", formData, {
      reportProgress: true,
    });
    this.httpClient.request(req).subscribe(event => {
       if (event instanceof HttpResponse) {
        if (event['body']['status'] == 'ok') {
          this.params['page']='1';
          this.getHeartData(this.url,this.params);
        } else {
          const toastCfg = new ToastConfig(ToastType.ERROR, '', event['body']['message'], 3000);
          this.toastService.toast(toastCfg);
        }
      }
    });
  }



  set (set: string) {
    this.http.setHeader('app-upgrades', set).then(v => v).then(w => {
      this.headers = this.http.getHeader('app-upgrades');
    });
  }



  upload(data) {
    this.uploadView = true;
    this.addView = false;
    this.tableView = false;
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
        this.data.map(v=>{
          if(v['desc'] == 'undefined'){
            v['desc'] = '';
          }
        });
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
