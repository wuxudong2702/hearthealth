import {Component, OnInit} from '@angular/core';
import {cell, SortDirection, sortObj,DataType} from '../../../shared/table/table-list.component';

// const headers: Array<cell> = [
//   {
//     key: 'productNUm',
//     show: true,
//     name: '商品编号',
//     index: 0,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.NONE, params: ''},
//   },
//   {
//     key: 'productName',
//     show: true,
//     name: '商品名称',
//     index: 1,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.NONE, params: ''},
//   },
//   {
//     key: 'introduction',
//     show: true,
//     name: '简介',
//     index: 2,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.NONE, params: ''},
//   },
//   {
//     key: 'address',
//     show: true,
//     name: '购买地址',
//     index: 3,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.NONE, params: ''},
//   },
//   {
//     key: 'show',
//     show: true,
//     name: '是否显示',
//     index: 4,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.ENUM, params: {0: '是', 1: '否'}},
//   },
// ];
const data: Array<any> = [//表格內容列表
  {
    productName: '大衣',
    productNUm: '00112225',
    address: 'www.taobao.com',
    show: 1,
    introduction: '好，真好',
  },
  {
    productName: 'user1',
    productNUm: '钱一',
    address: 'www.jingdong.com',
    show: 1,
    introduction: '看见对方案例看似简单我打卡机AK',
  },
  {
    productName: 'user1',
    productNUm: '钱一',
    address: 'www.taobao.com',
    show: 0,
    introduction: '看见对方案例看似简单我打卡机AK',
  },
  {
    productName: 'user1',
    productNUm: '钱一',
    address: 'www.taobao.com',
    show: 0,
    introduction: '看见对方案例看似简单我打卡机AK',
  },
  {
    productName: 'user1',
    productNUm: '钱一',
    address: 'www.taobao.com',
    show: 1,
    introduction: '看见对方案例看似简单我打卡机AK',
  },
  {
    productName: 'user1',
    productNUm: '钱一都',
    address: 'www.taobao.com',
    show: 1,
    introduction: '看见对方案例看似简单我打卡机AK',
  },
  {
    productName: 'user1',
    productNUm: '钱一',
    address: 'www.oiasd.com',
    show: 1,
    introduction: 20,
  },

];

@Component({
  selector: 'app-mall',
  templateUrl: './mall.component.html',
  styleUrls: ['./mall.component.css']
})
export class MallComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  headers: Array<cell> = [];
  data: Array<any> = data;
  addBtn: boolean = true;
  deleteBtn: boolean = true;
  searchBtn: boolean = true;
  editBtn: boolean = true;
  deleteAllBtn: boolean = true;
  setBtn: boolean = true;
  paginationBtn: boolean = true;
  setOperate: boolean = true;
  editor:boolean=false;

  onSort(sort:sortObj){
    let id=sort.id;
    let order=sort.order;

  }
  onEdit(id:any){
    // console.log(this.editor,id);
    this.editor=true;

  }
  onEditBack(id:number){
    this.editor=false;

  }
}
