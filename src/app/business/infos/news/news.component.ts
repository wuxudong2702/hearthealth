import {Component, OnInit} from '@angular/core';
import {cell, SortDirection, sortObj, news, DataType, searchObj,INFOTYPE,paginationObj} from '../../../shared/table/table-list.component';
import {ApiService} from '../../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';
import {ToastService} from '../../../shared/toast/toast.service';
import {ToastConfig, ToastType} from '../../../shared/toast/toast-model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: []
})
export class NewsComponent implements OnInit {

  constructor(private http: ApiService,private  toastService:ToastService) {
  }

  ngOnInit() {
    this.headers= this.http.getHeader('infos');
    this.getHeartData();
    this.http.isHavePerm('info-del').then(v => {
      this.deleteBtn = v;
      this.deleteAllBtn = v;
    });

    this.http.isHavePerm('info-edit').then(v => {
      this.editH5Btn = v;
    });
    this.http.isHavePerm('info-add').then(v => {
      this.addBtn = v;
    });
  }

  headers: Array<cell> = [];
  data: Array<any> = [];
  H5Type: Array<any> = [
     {key:INFOTYPE.GUIDE,value:"新手指南"},
     {key:INFOTYPE.STARTPAGE,value:"启动页"},
     {key:INFOTYPE.ABOUTUS,value:"关于我们"},
     {key:INFOTYPE.PROTOCOL,value:"用户注册协议"},
     {key:INFOTYPE.HEALTH,value:"健康资讯"}
  ];
  dataEditor: news;
  isSelectShow: boolean = false;



  deleteBtn: boolean = false;
  deleteAllBtn: boolean = false;
  addBtn: boolean = false;
  editH5Btn: boolean = false;

  searchBtn: boolean = true;
  setBtn: boolean = true;
  paginationBtn: boolean = true;
  setOperate: boolean = true;
  editor: boolean = false;
  pagination: paginationObj = new paginationObj();
  per_page:string;

  editH5(id: number) {
    this.dataEditor = this.data[id];
    this.editor = true;
    this.isSelectShow = false;
  }

  onEditBack(id: number) {
    this.editor = false;
    this.isSelectShow = false;
  }

  onSave(selectValue:any) {
      this.editor = false;
      this.isSelectShow = false;
  }

  onPost(selectValue:any) {
      this.editor = false;
      this.isSelectShow = false;
  }



  add() {
    this.editor = true;
    this.isSelectShow = true;
  }
  sort(sort: sortObj) {
    this.getHeartData('/api/admin/info/index', this.per_page, null, null,sort.key, sort.val);
  }

  del(ids: string) {
    this.http.ecgdDelData(ids).then(data => {
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
  search(searchObj: searchObj) {
    this.getHeartData('/api/admin/info/index', '' + this.pagination.per_page, searchObj.selectValue, searchObj.searchValue);
  }

  paginationChange(parmas) {
    this.per_page=parmas['per_page'];
    this.getHeartData(parmas['url'], parmas['per_page']);
  }

  set (set: string) {
    this.http.setHeader('infos', set).then(v => v).then(w => {
      this.headers = this.http.getHeader('heart-data');
    });
  }

  getHeartData(url: string = '/api/admin/info/index', per_page: string=this.per_page, find_key: string = null, find_val: string = null,sort_key:string=null,sort_val:string=null) {
    this.http.getData(url, per_page, find_key, find_val,sort_key,sort_val).then(data => {
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

  save(html:string){
    console.log('===============');
   // this.http.uploadHtml5Page('12','12','12',html);
  }

}
