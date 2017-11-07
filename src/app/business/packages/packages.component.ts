import { Component, OnInit } from '@angular/core';
import {cell, SortDirection, sortObj,DataType} from '../../shared/table/table-list.component';

const headers: Array<cell> = [
  {
    key: 'versions',
    show: true,
    name: '版本',
    index: 0,
    order: SortDirection.NONE,
    pipe: {type: DataType.NONE, params: ''},
  },
  {
    key: 'updateInfo',
    show: true,
    name: '更新说明',
    index: 1,
    order: SortDirection.NONE,
    pipe: {type: DataType.NONE, params: ''},
  }
];
const data: Array<any> = [
  {
    versions: 'v1.0',
    updateInfo: '我什么都没有改。。。。',
  },
  {
    versions: 'v2.0',
    updateInfo: '我改了一点点',
  },
  {
    versions: 'v3.0',
    updateInfo: '反正不是我改的',
  },

];

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  headers: Array<cell> = headers;
  data: Array<any> = data;
  setOperate: boolean = true;
  deleteBtn: boolean = true;
  deleteAllBtn: boolean = true;
  upload:boolean=true;
  onSort(sort:sortObj){
    let id=sort.id;
    let order=sort.order;

  }
}
