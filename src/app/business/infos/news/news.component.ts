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
  dataEditor: Array<any> = [];
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
  HTML5Content:string;
  per_page: string=null;
  find_key: string=null;
  find_val: string=null;
  sort_key: string=null;
  sort_val: string=null;
  url: string = '/api/admin/info/index';
  flag:boolean=true;
  id:string;

  editH5(i: number) {
    this.dataEditor = this.data[i];
   this.flag=false;
    this.id=this.data[i]['id'];
   console.log(this.id,'00000000000');
    this.http.infoContent(this.id).then(data => {
      if (data['status'] == 'ok') {
        // this.getHeartData(this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
        this.HTML5Content=data['data'];
        // console.log(this.HTML5Content,' vcccccccccccccccccccc');
        this.editor = true;
        this.isSelectShow = false;

      } else {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
        this.toastService.toast(toastCfg);
      }
    }).catch(err => {
      const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
      this.toastService.toast(toastCfg);
    });
  }

  onEditBack(id: number) {
    this.editor = false;
    this.isSelectShow = false;
    this.HTML5Content='';
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
    this.flag=true;
    this.editor = true;
    this.isSelectShow = true;
    this.dataEditor=[];
  }

  del(info_id: string) {
    this.http.infoDel(info_id).then(data => {
      if (data['status'] == 'ok') {
        this.getHeartData(this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
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
    this.http.setHeader('infos', set).then(v => v).then(w => {
      this.headers = this.http.getHeader('infos');
    });
  }

  save(html){
    console.log('===============',html);
    if(this.flag){
      this.http.uploadHtml5Page(html.title,html.description,html.label,html.header,html.content,html.footer).then(data => {
        if (data['status'] == 'ok') {
          this.getHeartData(this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
          this.editor=false;
        } else {
          const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
          this.toastService.toast(toastCfg);
        }
      }).catch(err => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
        this.toastService.toast(toastCfg);
      });
    }else{
      console.log(html,']]]]]]]]]]]]]]]]]');
      this.http.upDataHtml5Page(this.id,html.title,html.description,html.label,html.header,html.content,html.footer).then(data => {
        if (data['status'] == 'ok') {
          this.getHeartData(this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
          this.editor=false;
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
