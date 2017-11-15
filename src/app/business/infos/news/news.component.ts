import {Component, OnInit} from '@angular/core';
import {cell, SortDirection, sortObj, news, DataType, searchObj,INFOTYPE} from '../../../shared/table/table-list.component';
import {ApiService} from '../../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: []
})
export class NewsComponent implements OnInit {

  constructor(private http: ApiService) {
  }

  ngOnInit() {
    this.headers= this.http.getHeader('infos');
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

  del: boolean = this.http.isHavePerm('info-del');
  add: boolean = this.http.isHavePerm('info-add');
  edit: boolean = this.http.isHavePerm('info-edit');
  deleteBtn: boolean = this.del;
  deleteAllBtn: boolean = this.del;
  addBtn: boolean = this.add;
  editH5Btn: boolean = this.edit;

  searchBtn: boolean = true;
  setBtn: boolean = true;
  paginationBtn: boolean = true;
  setOperate: boolean = true;
  editor: boolean = false;

  onEditH5(id: number) {
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

  onDel(id: number) {
    this.http.postNewsDel(id).then(data => {
      this.data = data['data'];
    });
  }

  onDelAll(checkedList: any) {
    this.http.postNewsDelAll(checkedList).then(data => {
      this.data = data['data'];
    });
  }

  onSort(sort: sortObj) {
    this.http.postNewsSort(sort.id, sort.order).then(data => {
      this.data = data['data'];
    });
  }

  onAdd() {
    this.editor = true;
    this.isSelectShow = true;
  }

  onSearch(searchObj: searchObj) {
    console.log('news searchObj:', searchObj);
    this.http.postNewsSearch(searchObj.selectValue, searchObj.searchValue).then(data => {
      console.log('news Search result:', data);
      this.data = data['data'];
    });
  }
}
