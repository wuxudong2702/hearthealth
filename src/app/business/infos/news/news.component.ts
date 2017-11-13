import { Component, OnInit } from '@angular/core';
import {cell, SortDirection, sortObj,news,DataType,searchObj} from '../../../shared/table/table-list.component';
import {ApiService} from '../../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';

// const headers: Array<cell> = [
//   {
//     key: 'newsTitle',
//     show: true,
//     name: '标题',
//     index: 0,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.NONE, params: ''},
//   },
//   {
//     key: 'author',
//     show: true,
//     name: '作者',
//     index: 1,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.NONE, params: ''},
//   },
//
//   {
//     key: 'releaseDate',
//     show: true,
//     name: '发布日期',
//     index: 2,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.DATATIME, params: 'yyyyMMdd'},
//   },
//
// ];
// const data: Array<any> = [//表格內容列表
//   {
//     newsTitle: '秋季养生妙招',
//     author: '钱一',
//     releaseDate: '2017-9-1 18:09:00',
//
//   },
//   {
//     newsTitle: '润肺',
//     author: '钱先生',
//     releaseDate: '2017-1-1 18:09:00',
//     sex: 0,
//     age: 23,
//   },
//   {
//     newsTitle: '震惊！吃这个等于慢性自杀',
//     author: '钱一',
//     releaseDate: '2017-10-1 18:09:00',
//     sex: 0,
//     age: 23,
//   },
//   {
//     newsTitle: 'user1',
//     author: '钱一',
//     releaseDate: '2017-8-1 18:09:00',
//     sex: 0,
//     age: 23,
//   },
//   {
//     newsTitle: 'user1',
//     author: '钱一',
//     releaseDate: '2017-8-1 18:09:00',
//     sex: 1,
//     age: 23,
//   },
//   {
//     newsTitle: 'user1',
//     author: '钱一都',
//     releaseDate: '2017-8-1 18:09:00',
//     sex: 0,
//     age: 23,
//   },
//   {
//     newsTitle: 'user1',
//     author: '钱一',
//     releaseDate: '2017-8-1',
//     sex: 1,
//     age: 20,
//   },
//
// ];

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers:[ApiService]
})
export class NewsComponent implements OnInit {

    constructor(private http: ApiService) {}

    ngOnInit() {
        this.http.getNewsHeader().then(data => {
            this.headers = data['headers'];
        });
        this.http.getNewsData().then(data => {
            this.data = data['data'];
            console.log('0000',this.data);
        });
    }

  headers: Array<cell> = [];
  data: Array<any> = [];
  dataEditor: news;
  addBtn:boolean = true;
  deleteBtn: boolean = true;
  searchBtn: boolean = true;
  editBtn: boolean = true;
  deleteAllBtn: boolean = true;
  setBtn: boolean = true;
  paginationBtn: boolean = true;
  setOperate:boolean=true;
  editor:boolean=false;

  onEdit(id:number){
     console.log('infos news id',this.editor,id);
    this.dataEditor=this.data[id];
    this.editor=true;
   console.log('infos news dataEditor',this.dataEditor);
  }
  onEditBack(id:number){
    this.editor=false;

  }

    onDel(id:number){
        this.http.postNewsDel(id).then(data=>{
            console.log(data,'删除');
            this.data=data['data'];
        });
    }
    onDelAll(checkedList:any){
        this.http.postNewsDelAll(checkedList).then(data=>{
            console.log(data,'删除全部');
            this.data=data['data'];
        });
    }
    onSort(sort: sortObj) {
        this.http.postNewsSort(sort.id,sort.order).then(data=>{
            console.log(data,'排序');
            this.data=data['data'];
        });
    }
    onAdd(){
      console.log('212132323');
      this.editor=true;
    }
    onSearch(searchObj: searchObj) {
        console.log('news searchObj:',searchObj);
        // this.selectValue = searchObj.selectValue;
        // this.searchValue = searchObj.searchValue;
        this.http.postNewsSearch(searchObj.selectValue,searchObj.searchValue).then(data => {
            console.log('news Search result:',data);
            this.data = data['data'];
        });
    }
}
