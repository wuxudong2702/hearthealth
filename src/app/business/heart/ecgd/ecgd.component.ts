import {Component, OnInit, ViewChild} from '@angular/core';
import {cell, SortDirection, DataType} from '../../../shared/table/table-list.component';

const headers: Array<cell> = [
  {
    key: 'userName',
    show: true,
    name: '用户名',
    index: 0,
    order: SortDirection.NONE,
    pipe: {type: DataType.NONE, params: ''},
  },
  {
    key: 'relationship',
    show: true,
    name: '与主账户关系',
    index: 1,
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
    name: '心跳数据采集时间',
    index: 3,
    order: SortDirection.NONE,
    pipe: {type: DataType.DATATIME, params: 'yyyyMMdd'},
  },
  {
    key: 'heartDataLength',
    show: true,
    name: '心跳数据长度',
    index: 4,
    order: SortDirection.NONE,
    pipe: {type: DataType.NONE, params: 's'},
  },
  {
    key: 'devNumber',
    show: true,
    name: '采集设备号',
    index: 5,
    order: SortDirection.NONE,
    pipe: {type: DataType.NONE, params: ''},
  },
  {
    key: 'HeartRate',
    show: true,
    name: '心率',
    index: 6,
    order: SortDirection.NONE,
    pipe: {type: DataType.NONE, params: ''},
  },
];
const data: Array<any> = [//表格內容列表
  {
    userName: '张文丽',
    relationship: '父女',
    acquisitionTime: '2017-8-1 18:09:00',
    heartDataLength:2,
    devNumber:'123456789',
    HeartRate:'良好',
    sex: 0,
    age: 23,
  },
  {
    userName: '伍子胥',
    relationship: '钱一',
    acquisitionTime: '2017-8-1 18:09:00',
    heartDataLength:2,
    devNumber:'123456789',
    HeartRate:'一般',
    sex: 1,
    age: 23,
  },
  {
    userName: '李文龙',
    relationship: '兄弟',
    acquisitionTime: '2017-8-1 18:09:00',
    heartDataLength:2,
    devNumber:'23465346784',
    HeartRate:'优秀',
    sex: 0,
    age: 23,
  },
  {
    userName: 'user1',
    relationship: '钱一',
    acquisitionTime: '2017-8-1 18:09:00',
    heartDataLength:5,
    devNumber:'3475656798768',
    HeartRate:'良好',
    sex: 0,
    age: 23,
  },
  {
    userName: 'user1',
    relationship: '钱一',
    acquisitionTime: '2017-8-1 18:09:00',
    heartDataLength:8,
    devNumber:'123456789',
    HeartRate:'良好',
    sex: 1,
    age: 23,
  },
  {
    userName: 'user1',
    relationship: '钱一都',
    acquisitionTime: '2017-8-1 18:09:00',
    heartDataLength:2,
    devNumber:'123456789',
    HeartRate:'良好',
    sex: 0,
    age: 23,
  },
  {
    userName: 'user1',
    relationship: '钱一',
    acquisitionTime: '2017-8-1',
    heartDataLength:6,
    devNumber:'123456789',
    HeartRate:'及格',
    sex: 1,
    age: 20,
  },

];
const dataChart: Array<any> = [
  [
    ["05", 116], ["06", 129], ["07", 135],
    ["08", 86], ["09", 73], ["10", 85], ["11", 73],
    ["12", 68], ["13", 92], ["14", 130], ["15", 245],
    ["16", 139], ["17", 115], ["18", 111], ["19", 309],
    ["20", 206], ["21", 137], ["22", 128], ["23", 85],
    ["24", 94], ["25", 71], ["26", 106], ["27", 84],
    ["28", 93], ["29", 85], ["30", 73]
  ],

  [
    ["12", 68], ["13", 92], ["14", 130], ["15", 245],
    ["16", 139], ["17", 115], ["18", 111], ["19", 309],
    ["20", 206], ["21", 137], ["22", 128], ["23", 85],
    ["24", 94], ["25", 71], ["26", 106], ["27", 84],
    ["28", 93], ["29", 85], ["30", 73]
  ],


];

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

  dataChart: Array<any> = dataChart;
  dataChart1: Array<any> = [];
  userInfoChart: object;
  userNameChart: string;
  acquisitionTimeChart: string;

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
  setOperate: boolean = true;

  showChartView: boolean = false;

  onChart(chartId1: number) {
      console.log('chartId',chartId1, dataChart[chartId1]);
    this.dataChart1= this.dataChart[chartId1];
    this.userInfoChart = data[chartId1];
    // console.log(' this.userInfoChart',  this.userInfoChart)
    this.showChartView = !this.showChartView;
  }

}
