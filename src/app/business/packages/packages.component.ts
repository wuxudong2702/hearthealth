import { Component, OnInit } from '@angular/core';
import {cell, SortDirection, sortObj,DataType} from '../../shared/table/table-list.component';
import {ApiService} from '../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';

// const headers: Array<cell> = [
//   {
//     key: 'versions',
//     show: true,
//     name: '版本',
//     index: 0,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.NONE, params: ''},
//   },
//   {
//     key: 'updateInfo',
//     show: true,
//     name: '更新说明',
//     index: 1,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.NONE, params: ''},
//   }
// ];
// const data: Array<any> = [
//   {
//     versions: 'v1.0',
//     updateInfo: '我什么都没有改。。。。',
//   },
//   {
//     versions: 'v2.0',
//     updateInfo: '我改了一点点',
//   },
//   {
//     versions: 'v3.0',
//     updateInfo: '反正不是我改的',
//   },
//
// ];

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css'],
  providers:[]
})
export class PackagesComponent implements OnInit {

    constructor(private http: ApiService) {}

    ngOnInit() {
        this.http.getPackagesHeader().then(data => {
            this.headers = data['headers'];
        });
        this.http.getPackagesData().then(data => {
            this.data = data['data'];
        });
    }

  headers: Array<cell> = [];
  data: Array<any> = [];
  setOperate: boolean = true;
  deleteBtn: boolean = true;
  deleteAllBtn: boolean = true;
  uploadBtn:boolean=true;

    del(id:number){
        this.http.postPackagesDel(id).then(data=>{
            console.log(data,'删除');
            this.data=data['data'];
        });
    }
    delAll(checkedList:any){
        this.http.postPackagesDelAll(checkedList).then(data=>{
            console.log(data,'删除全部');
            this.data=data['data'];
        });
    }
    sort(sort: sortObj) {
        this.http.postPackagesSort(sort.id,sort.order).then(data=>{
            console.log(data,'排序');
            this.data=data['data'];
        });
    }
  upload(){

  }
}
