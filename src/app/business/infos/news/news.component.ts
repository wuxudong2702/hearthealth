import { Component, OnInit } from '@angular/core';
import {cell, SortDirection, sortObj,DataType} from '../../../shared/table/table-list.component';

const headers: Array<cell> = [
  {
    key: 'newsTitle',
    show: true,
    name: '标题',
    index: 0,
    order: SortDirection.NONE,
    pipe: {type: DataType.NONE, params: ''},
  },
  {
    key: 'author',
    show: true,
    name: '作者',
    index: 1,
    order: SortDirection.NONE,
    pipe: {type: DataType.NONE, params: ''},
  },

  {
    key: 'releaseDate',
    show: true,
    name: '发布日期',
    index: 2,
    order: SortDirection.NONE,
    pipe: {type: DataType.DATATIME, params: 'yyyyMMdd'},
  },

];
const data: Array<any> = [//表格內容列表
  {
    newsTitle: '秋季养生妙招',
    author: '钱一',
    releaseDate: '2017-9-1 18:09:00',

  },
  {
    newsTitle: '润肺',
    author: '钱先生',
    releaseDate: '2017-1-1 18:09:00',
    sex: 0,
    age: 23,
  },
  {
    newsTitle: '震惊！吃这个等于慢性自杀',
    author: '钱一',
    releaseDate: '2017-10-1 18:09:00',
    sex: 0,
    age: 23,
  },
  {
    newsTitle: 'user1',
    author: '钱一',
    releaseDate: '2017-8-1 18:09:00',
    sex: 0,
    age: 23,
  },
  {
    newsTitle: 'user1',
    author: '钱一',
    releaseDate: '2017-8-1 18:09:00',
    sex: 1,
    age: 23,
  },
  {
    newsTitle: 'user1',
    author: '钱一都',
    releaseDate: '2017-8-1 18:09:00',
    sex: 0,
    age: 23,
  },
  {
    newsTitle: 'user1',
    author: '钱一',
    releaseDate: '2017-8-1',
    sex: 1,
    age: 20,
  },

];

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  headers: Array<cell> = headers;
  data: Array<any> = data;
  addBtn:boolean = true;
  deleteBtn: boolean = true;
  searchBtn: boolean = true;
  editBtn: boolean = true;
  deleteAllBtn: boolean = true;
  setBtn: boolean = true;
  paginationBtn: boolean = true;

  onSort(sort:sortObj){
    let id=sort.id;
    let order=sort.order;

  }
}
