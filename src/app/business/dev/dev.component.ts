import {Component, OnInit} from '@angular/core';
import {cell, SortDirection, sortObj, DataType,searchObj} from '../../shared/table/table-list.component';
import {ApiService} from '../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.css'],
  providers: [ApiService]
})
export class DevComponent implements OnInit {

  constructor(private http: ApiService) {
  }

  ngOnInit() {
    this.http.getDevHeader().then(data => {
      this.headers = data['headers'];
    });
    this.http.getDevData().then(data => {
      this.data = data['data'];
    });
  }

  headers: Array<cell> = [];
  headerAdd: Array<cell> = [];
  data: Array<any> = [];

  addEditTitle: string = '添加';

  addBtn: boolean = true;
  deleteBtn: boolean = true;
  searchBtn: boolean = true;
  deleteAllBtn: boolean = true;
  setBtn: boolean = true;
  paginationBtn: boolean = true;
  setOperate: boolean = true;

  tableView: boolean = true;
  addView: boolean = false;

  add() {
    this.addView = true;
    this.tableView = false;
  }

  del(id: number) {
    this.http.postDevDel(id).then(data => {
      console.log(data, '删除');
      this.data = data['data'];
    });
  }

  delAll(checkedList: any) {
    this.http.postDevDelAll(checkedList).then(data => {
      console.log(data, '删除全部');
      this.data = data['data'];
    });
  }

  sort(sort: sortObj) {
    this.http.postDevSort(sort.id, sort.order).then(data => {
      console.log(data, '排序');
      this.data = data['data'];
    });
  }

  submit(AddData: string) {
    this.http.postDevSubmit(AddData).then(data => {
      this.data = data['data'];
    });
    this.addView = false;
    this.tableView = true;
  }

  cancle() {
    this.addView = false;
    this.tableView = true;
  }

  Search(searchObj: searchObj) {
      console.log('dev searchObj:',searchObj);
      // this.selectValue = searchObj.selectValue;
      // this.searchValue = searchObj.searchValue;
      this.http.postDevSearch(searchObj.selectValue,searchObj.searchValue).then(data => {
          console.log('dev Search result:',data);
          this.data = data['data'];
      });
  }
}
