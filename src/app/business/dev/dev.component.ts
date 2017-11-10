import {Component, OnInit} from '@angular/core';
import {cell, SortDirection, sortObj, DataType, INPUTTYPE} from '../../shared/table/table-list.component';

const headers: Array<cell> = [
    {
      key: 'userName',
      show: true,
      name: '用户名',
      index: 4,
      order: SortDirection.NONE,
      pipe: {type: DataType.NONE, params: ''},
      val: '',
      selectVal:[],
      invalidInfo: '需要填写用户名！',
      required: true,
      pattern: '^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$\n',
      inputType: INPUTTYPE.INPUT

    },
    {
      key: 'accountBind',
      show: true,
      name: '绑定账户',
      index: 3,
      order: SortDirection.NONE,
      pipe: {type: DataType.NONE, params: ''},
      val: '',
      selectVal:[],
      invalidInfo: '需要填写绑定的账户！',
      required: true,
      pattern: '',
      inputType: INPUTTYPE.INPUT
    },
    {
      key: 'isBinding',
      show:
        true,
      name:
        '是否绑定',
      index:
        2,
      order:
      SortDirection.NONE,
      pipe:
        {
          type: DataType.ENUM, params: {0: '是', 1: '否'}
        },
      val: '是',
      selectVal:['是', '否'],
      invalidInfo: '请选择是否绑定！',
      required: false,
      pattern: '',
      inputType: INPUTTYPE.SELECT
    }
    ,
    {
      key: 'devNumber',
      show:
        true,
      name:
        '设备号',
      index:
        0,
      order:
      SortDirection.NONE,
      pipe:
        {
          type: DataType.NONE, params:
          ''
        }
      ,
      val: '',
      selectVal:[],
      invalidInfo: '需要填写用户名',
      required: true,
      pattern: '',
      inputType: INPUTTYPE.INPUT
    }
    ,
   {
      key: 'devType',
      show: true,
      name: '设备类型',
      index: 1,
      order: SortDirection.NONE,
      pipe: {type: DataType.ENUM, params: {0: '卡片式', 1: '佩戴市'}},
      val: '卡片式',
     selectVal:['卡片式', '佩戴市'],
      invalidInfo: '请填写设备类型！',
      required: false,
      pattern: '',
      inputType: INPUTTYPE.SELECT
    }
    ,
  ]
;
const data: Array<any> = [//表格內容列表
  {
    userName: '张文丽',
    accountBind: '小名',
    isBinding: 1,
    heartDataLength: 2,
    devNumber: '123456789',
    devType: 0,
  }
];

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.css']
})
export class DevComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  headers: Array<cell> = headers;
  data: Array<any> = data;
  addBtn: boolean = true;
  deleteBtn: boolean = true;
  searchBtn: boolean = true;
  deleteAllBtn: boolean = true;
  setBtn: boolean = true;
  paginationBtn: boolean = true;
  setOperate: boolean = true;

  onSort(sort: sortObj) {
    let id = sort.id;
    let order = sort.order;

  }
}
