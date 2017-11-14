import {Component, OnInit} from '@angular/core';
import {cell, SortDirection, sortObj, news, DataType, searchObj} from '../../../shared/table/table-list.component';
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
    this.http.getNewsHeader().then(data => {
      this.headers = data['headers'];
    });
    this.http.getNewsData().then(data => {
      this.data = data['data'];
      console.log('0000', this.data);
    });
  }

  headers: Array<cell> = [];
  data: Array<any> = [];
  H5Type: Array<any> = [
    {key:1,value:"用户注册协议"},
    {key:2,value:"新手指南"},
    {key:3,value:"启动页"},
    {key:4,value:"关于我们"},
    {key:5,value:"健康资讯"}
  ];
  dataEditor: news;
  addBtn: boolean = true;
  deleteBtn: boolean = true;
  searchBtn: boolean = true;
  editBtn: boolean = true;
  deleteAllBtn: boolean = true;
  setBtn: boolean = true;
  paginationBtn: boolean = true;
  setOperate: boolean = true;
  editor: boolean = false;

  onEdit(id: number) {
    console.log('infos news id', this.editor, id);
    this.dataEditor = this.data[id];
    this.editor = true;
    console.log('infos news dataEditor', this.dataEditor);
  }

  onEditBack(id: number) {
    this.editor = false;

  }

  onDel(id: number) {
    this.http.postNewsDel(id).then(data => {
      console.log(data, '删除');
      this.data = data['data'];
    });
  }

  onDelAll(checkedList: any) {
    this.http.postNewsDelAll(checkedList).then(data => {
      console.log(data, '删除全部');
      this.data = data['data'];
    });
  }

  onSort(sort: sortObj) {
    this.http.postNewsSort(sort.id, sort.order).then(data => {
      console.log(data, '排序');
      this.data = data['data'];
    });
  }

  onAdd() {
    console.log('212132323');
    this.editor = true;
  }

  onSearch(searchObj: searchObj) {
    console.log('news searchObj:', searchObj);
    this.http.postNewsSearch(searchObj.selectValue, searchObj.searchValue).then(data => {
      console.log('news Search result:', data);
      this.data = data['data'];
    });
  }
}
