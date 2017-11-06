import {Component, OnInit, ViewChild} from '@angular/core';
// import {TableListComponent} from '../../../shared/table/table-list.component';
import {cell, SortDirection, DataType} from '../../../shared/table/table-list.component';


const headers: Array<cell> = [
  {
    key: 'userName',
    show: true,
    name: '用户名',
    index: 1,
    order: SortDirection.NONE,
    pipe: {type: DataType.NONE, params: ''},
  },
  {
    key: 'relationship',
    show: true,
    name: '与主账户关系',
    index: 0,
    order: SortDirection.NONE,
    pipe: {type: DataType.NONE, params: ''},
  },
  {
    key: 'age',
    show: true,
    name: '年龄',
    index: 2,
    order: SortDirection.NONE,
    pipe: {type: DataType.NONE, params: ''},
  },
  {
    key: 'acquisitionTime',
    show: true,
    name: '采集时间',
    index: 3,
    order: SortDirection.NONE,
    pipe: {type: DataType.DATATIME, params: 'yyyyMMdd'},
  },
  {
    key: 'sex',
    show: true,
    name: '性别',
    index: 3,
    order: SortDirection.NONE,
    pipe: {type: DataType.ENUM, params: {0: '女', 1: '男'}},
  },
];
const data: Array<any> = [//表格內容列表
  {
    userName: 'user1',
    relationship: '钱一',
    acquisitionTime: '2017-8-1 18:09:00',
    sex: 0,
    age: 23,
  },
  {
    userName: 'user1',
    relationship: '钱一',
    acquisitionTime: '2017-8-1 18:09:00',
    sex: 0,
    age: 23,
  },
  {
    userName: 'user1',
    relationship: '钱一',
    acquisitionTime: '2017-8-1 18:09:00',
    sex: 0,
    age: 23,
  },
  {
    userName: 'user1',
    relationship: '钱一',
    acquisitionTime: '2017-8-1 18:09:00',
    sex: 0,
    age: 23,
  },
  {
    userName: 'user1',
    relationship: '钱一',
    acquisitionTime: '2017-8-1 18:09:00',
    sex: 1,
    age: 23,
  },
  {
    userName: 'user1',
    relationship: '钱一都',
    acquisitionTime: '2017-8-1 18:09:00',
    sex: 0,
    age: 23,
  },
  {
    userName: 'user1',
    relationship: '钱一',
    acquisitionTime: '2017-8-1',
    sex: 1,
    age: 20,
  },

];

// const chartId:number=1;
@Component({
  selector: 'app-ecgd',
  templateUrl: './ecgd.component.html',
  styleUrls: ['./ecgd.component.css']
})
export class EcgdComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  headers: Array<cell> = headers;
  data: Array<any> = data;

  // addBtn: boolean = false;
  deleteBtn: boolean = true;
  // showAddView: boolean = true;
  downloadBtn: boolean = true;
  searchBtn: boolean = true;
  detailsBtn: boolean = true;
  // editBtn: boolean = true;
  deleteAllBtn: boolean = true;
  setBtn: boolean = true;
  chartBtn: boolean = true;
  paginationBtn: boolean = true;

  // showAddView:boolean = true;
  // onAdd() {
  // console.log(this.showAddView);
  // this.showAddView = !this.showAddView;
  // }
  showChartView: boolean = false;
  onChart(chartId:number){
    console.log('chartId',chartId)
       this.showChartView=!this.showChartView;
  }


  // onChart() {
  //   this.showChartView = !this.showChartView;
  // }
}
