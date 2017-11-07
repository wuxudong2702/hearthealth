import { Component, OnInit } from '@angular/core';
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
    accountType: '子帐户',
    relationship: '父子',
    historicalTests: '3',
    earliest: '2017-8-1 18:09:00',
    latest: '2017-10-1 10:20:00',
  },
  {
    userName: 'user1',
    accountType: '子帐户',
    relationship: '父子',
    historicalTests: '3',
    earliest: '2017-8-1 18:09:00',
    latest: '2017-10-1 10:20:00',
  },
  {
    userName: 'user1',
    accountType: '子帐户',
    relationship: '父子',
    historicalTests: '3',
    earliest: '2017-8-1 18:09:00',
    latest: '2017-10-1 10:20:00',
  },
  {
    userName: 'user1',
    accountType: '子帐户',
    relationship: '父子',
    historicalTests: '3',
    earliest: '2017-8-1 18:09:00',
    latest: '2017-10-1 10:20:00',
  },
  {
    userName: 'user1',
    accountType: '子帐户',
    relationship: '父子',
    historicalTests: '3',
    earliest: '2017-8-1 18:09:00',
    latest: '2017-10-1 10:20:00',
  },

];
const dataChart: Array<any> = [
  [
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
      ["2000-06-05", 116], ["2000-06-06", 129], ["2000-06-07", 135], ["2000-06-08", 86],
      ["2000-06-09", 73], ["2000-06-10", 85], ["2000-06-11", 73], ["2000-06-12", 68],
      ["2000-06-13", 92], ["2000-06-14", 130], ["2000-06-15", 245], ["2000-06-16", 139],
      ["2000-06-17", 115], ["2000-06-18", 111], ["2000-06-19", 309], ["2000-06-20", 206],
    ],
    [
      ["2000-06-21", 137], ["2000-06-22", 128], ["2000-06-23", 85], ["2000-06-24", 94],
      ["2000-06-25", 71], ["2000-06-26", 106], ["2000-06-27", 84], ["2000-06-28", 93],
      ["2000-06-29", 85], ["2000-06-30", 73], ["2000-07-01", 83], ["2000-07-02", 125],
      ["2000-07-03", 107], ["2000-07-04", 82], ["2000-07-05", 44], ["2000-07-06", 72],
    ],
    [
      ["05", 166], ["06", 149], ["07", 135],
      ["08", 86], ["09", 73], ["10", 85], ["11", 73],
      ["12", 68], ["13", 92], ["14", 130], ["15", 245],
      ["16", 139], ["17", 115], ["18", 111], ["19", 309],
      ["20", 206], ["21", 137], ["22", 128], ["23", 85],
      ["24", 94], ["25", 71], ["26", 106], ["27", 84],
      ["28", 93], ["29", 85], ["30", 73]
    ],
    [
      ["05", 11], ["06", 19], ["07", 13],
      ["08", 86], ["09", 73], ["10", 85], ["11", 73],
      ["12", 68], ["13", 92], ["14", 130], ["15", 245],
      ["16", 139], ["17", 115], ["18", 111], ["19", 309],
      ["20", 206], ["21", 137], ["22", 128], ["23", 85],
      ["24", 94], ["25", 71], ["26", 106], ["27", 84],
      ["28", 93], ["29", 85], ["30", 73]
    ],
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
  selector: 'app-hhr',
  templateUrl: './hhr.component.html',
  styleUrls: ['./hhr.component.css'],
})
export class HhrComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  dataChart: Array<any> = dataChart;
  headers: Array<cell> = headers;
  data: Array<any> = data;
  dataChart1: Array<any>;

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

  showChartView: boolean = false;
  userName:string='';

  onChart(chartId1: number) {
    this.dataChart1 = dataChart[chartId1];
    this.userName = data[chartId1].userName;
    this.showChartView = !this.showChartView;
  }
}
