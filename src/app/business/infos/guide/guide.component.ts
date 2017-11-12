import { Component, OnInit } from '@angular/core';
import {cell, SortDirection, sortObj,DataType} from '../../../shared/table/table-list.component';
import {ApiService} from '../../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';

// const headers: Array<cell> = [
//   {
//     key: 'version',
//     show: true,
//     name: '版本名称',
//     index: 0,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.NONE, params: ''},
//   },
//
//
//   {
//     key: 'acquisitionTime',
//     show: true,
//     name: '发布日期',
//     index: 1,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.DATATIME, params: 'yyyyMMdd'},
//   },
//
// ];
// const data: Array<any> = [//表格內容列表
//   {
//     version: 'V1.0',
//     acquisitionTime: '2017-1-1 18:09:00',
//   },
//   {
//     version: 'V1.6',
//     acquisitionTime: '2017-8-1 18:09:00',
//   },
//   {
//     version: 'V1.0',
//     acquisitionTime: '2017-8-1 18:09:00',
//   },
//   {
//     version: 'V1.8',
//     acquisitionTime: '2017-8-10 18:09:00',
//   },
//   {
//     version: 'V2.1',
//     acquisitionTime: '2017-8-12 18:09:00',
//   },
//   {
//     version: 'V3.0',
//     acquisitionTime: '2017-8-25 18:09:00',
//   },
//   {
//     version: 'V2.0',
//     acquisitionTime: '2017-9-7 18:09:00',
//   },
//
// ];

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css'],
  providers:[ApiService]
})
export class GuideComponent implements OnInit {

    constructor(private http: ApiService) {}

    ngOnInit() {
        this.http.getGuideHeader().then(data => {
            this.headers = data['headers'];
        });
        this.http.getGuideData().then(data => {
            this.data = data['data'];
        });
    }

  headers: Array<cell> = [];
  data: Array<any> = [];
  addBtn:boolean = true;
  deleteBtn: boolean = true;
  searchBtn: boolean = true;
  editBtn: boolean = true;
  deleteAllBtn: boolean = true;
  setBtn: boolean = true;
  paginationBtn: boolean = true;
  setOperate:boolean=true;
  editor:boolean=false;

  onEdit(id:any){
      this.editor=true;
  }
  onEditBack(id:number){
    this.editor=false;
  }

  onDel(id:number){
      this.http.postGuideDel(id).then(data=>{
          console.log(data,'删除');
          this.data=data['data'];
      });
  }
  onDelAll(checkedList:any){
      this.http.postGuideDelAll(checkedList).then(data=>{
          console.log(data,'删除全部');
          this.data=data['data'];
      });
  }
  onSort(sort: sortObj) {
      this.http.postGuideSort(sort.id,sort.order).then(data=>{
          console.log(data,'排序');
          this.data=data['data'];
      });
  }
  onAdd(){
    console.log('212132323');
    this.editor=true;
  }
}
