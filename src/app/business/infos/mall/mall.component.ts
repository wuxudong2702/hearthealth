import {Component, OnInit} from '@angular/core';
import {cell, SortDirection, sortObj,DataType} from '../../../shared/table/table-list.component';
import {ApiService} from '../../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';

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
// const data: Array<any> = [//表格內容列表
//   {
//     productName: '大衣',
//     productNUm: '00112225',
//     address: 'www.taobao.com',
//     show: 1,
//     introduction: '好，真好',
//   },
//   {
//     productName: 'user1',
//     productNUm: '钱一',
//     address: 'www.jingdong.com',
//     show: 1,
//     introduction: '看见对方案例看似简单我打卡机AK',
//   },
//   {
//     productName: 'user1',
//     productNUm: '钱一',
//     address: 'www.taobao.com',
//     show: 0,
//     introduction: '看见对方案例看似简单我打卡机AK',
//   },
//   {
//     productName: 'user1',
//     productNUm: '钱一',
//     address: 'www.taobao.com',
//     show: 0,
//     introduction: '看见对方案例看似简单我打卡机AK',
//   },
//   {
//     productName: 'user1',
//     productNUm: '钱一',
//     address: 'www.taobao.com',
//     show: 1,
//     introduction: '看见对方案例看似简单我打卡机AK',
//   },
//   {
//     productName: 'user1',
//     productNUm: '钱一都',
//     address: 'www.taobao.com',
//     show: 1,
//     introduction: '看见对方案例看似简单我打卡机AK',
//   },
//   {
//     productName: 'user1',
//     productNUm: '钱一',
//     address: 'www.oiasd.com',
//     show: 1,
//     introduction: 20,
//   },
//
// ];

@Component({
  selector: 'app-mall',
  templateUrl: './mall.component.html',
  styleUrls: ['./mall.component.css'],
  providers:[ApiService]
})
export class MallComponent implements OnInit {

    constructor(private http: ApiService) {}

    ngOnInit() {
        this.http.getMallHeader().then(data => {
            this.headers = data['headers'];
        });
        this.http.getMallData().then(data => {
            this.data = data['data'];
        });
    }

  headers: Array<cell> = [];
  data: Array<any> = [];
  addBtn: boolean = true;
  deleteBtn: boolean = true;
  searchBtn: boolean = true;
  editBtn: boolean = true;
  deleteAllBtn: boolean = true;
  setBtn: boolean = true;
  paginationBtn: boolean = true;
  setOperate: boolean = true;
  editor:boolean=false;

  onEdit(id:any){
    // console.log(this.editor,id);
    this.editor=true;

  }
  onEditBack(id:number){
    this.editor=false;

  }


    onDel(id:number){
        this.http.postMallDel(id).then(data=>{
            console.log(data,'删除');
            this.data=data['data'];
        });
    }
    onDelAll(checkedList:any){
        this.http.postMallDelAll(checkedList).then(data=>{
            console.log(data,'删除全部');
            this.data=data['data'];
        });
    }
    onSort(sort: sortObj) {
        this.http.postMallSort(sort.id,sort.order).then(data=>{
            console.log(data,'排序');
            this.data=data['data'];
        });
    }
  onAdd(){
    console.log('212132323');
    this.editor=true;
  }
}
