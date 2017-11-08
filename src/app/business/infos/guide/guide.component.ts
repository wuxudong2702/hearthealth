import { Component, OnInit } from '@angular/core';
import {cell, SortDirection, sortObj,DataType} from '../../../shared/table/table-list.component';

const headers: Array<cell> = [
  {
    key: 'version',
    show: true,
    name: '版本名称',
    index: 0,
    order: SortDirection.NONE,
    pipe: {type: DataType.NONE, params: ''},
  },


  {
    key: 'acquisitionTime',
    show: true,
    name: '发布日期',
    index: 1,
    order: SortDirection.NONE,
    pipe: {type: DataType.DATATIME, params: 'yyyyMMdd'},
  },

];
const data: Array<any> = [//表格內容列表
  {
    version: 'V1.0',
    acquisitionTime: '2017-1-1 18:09:00',
  },
  {
    version: 'V1.6',
    acquisitionTime: '2017-8-1 18:09:00',
  },
  {
    version: 'V1.0',
    acquisitionTime: '2017-8-1 18:09:00',
  },
  {
    version: 'V1.8',
    acquisitionTime: '2017-8-10 18:09:00',
  },
  {
    version: 'V2.1',
    acquisitionTime: '2017-8-12 18:09:00',
  },
  {
    version: 'V3.0',
    acquisitionTime: '2017-8-25 18:09:00',
  },
  {
    version: 'V2.0',
    acquisitionTime: '2017-9-7 18:09:00',
  },

];

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css']
})
export class GuideComponent implements OnInit {

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
  setOperate:boolean=true;
  editor:boolean=false;

  onSort(sort:sortObj){
    let id=sort.id;
    let order=sort.order;
  }
  onEdit(id:any){
      this.editor=true;

  }
  onEditBack(id:number){
    this.editor=false;

  }
}
