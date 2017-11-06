import { Component,Injectable, OnInit } from '@angular/core';
import {cell, SortDirection, DataType} from '../../../shared/table/table-list.component';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerI18n, DatepickerI18nType } from '../../../shared/datepickerI18n/datepickerI18n';

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
    key: 'accountType',
    show: true,
    name: '帐户类型',
    index: 0,
    order: SortDirection.NONE,
    pipe: {type: DataType.NONE, params: ''},
  },
  {
    key: 'relationship',
    show: true,
    name: '与主账户关系',
    index: 2,
    order: SortDirection.NONE,
    pipe: {type: DataType.NONE, params: ''},
  },
  {
    key: 'historicalTests',
    show: true,
    name: '历史检测次数',
    index: 3,
    order: SortDirection.NONE,
    pipe: {type: DataType.DATATIME, params: 'yyyyMMdd'},
  },
  {
    key: 'earliest',
    show: true,
    name: '最早检测时间',
    index: 3,
    order: SortDirection.NONE,
    pipe: {type: DataType.DATATIME, params: 'yyyyMMdd'},
  },
  {
     key: 'latest',
     show: true,
     name: '最晚检测时间',
     index: 4,
     order: SortDirection.NONE,
     pipe: {type: DataType.DATATIME, params: 'yyyyMMdd'},
  },
];
const data: Array<any> = [
  {
    userName: 'user1',
    accountType:'子帐户',
    relationship: '父子',
    historicalTests:'3',
    earliest: '2017-8-1 18:09:00',
    latest: '2017-10-1 10:20:00',
  },
  {
      userName: 'user1',
      accountType:'子帐户',
      relationship: '父子',
      historicalTests:'3',
      earliest: '2017-8-1 18:09:00',
      latest: '2017-10-1 10:20:00',
  },
  {
      userName: 'user1',
      accountType:'子帐户',
      relationship: '父子',
      historicalTests:'3',
      earliest: '2017-8-1 18:09:00',
      latest: '2017-10-1 10:20:00',
  },
  {
      userName: 'user1',
      accountType:'子帐户',
      relationship: '父子',
      historicalTests:'3',
      earliest: '2017-8-1 18:09:00',
      latest: '2017-10-1 10:20:00',
  },
  {
      userName: 'user1',
      accountType:'子帐户',
      relationship: '父子',
      historicalTests:'3',
      earliest: '2017-8-1 18:09:00',
      latest: '2017-10-1 10:20:00',
  },

];

@Component({
  selector: 'app-hhr',
  templateUrl: './hhr.component.html',
  styleUrls: ['./hhr.component.css'],
  providers: [DatepickerI18nType, { provide: NgbDatepickerI18n, useClass: DatepickerI18n }]
})
export class HhrComponent implements OnInit {

  selectedDateStart;
  selectedDateEnd;

  constructor() { }

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

  datePickerConfig = {
     locale: 'zh-CN'
  };
  showChartView: boolean = false;
  onChart(chartId:number){
    console.log('chartId',chartId);
    this.showChartView = !this.showChartView;
  }
}
