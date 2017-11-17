import { Component, OnInit } from '@angular/core';
import {cell, SortDirection, sortObj,DataType,searchObj} from '../../shared/table/table-list.component';
import {ApiService} from '../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css'],
  providers:[]
})
export class LogComponent implements OnInit {

    constructor(private http: ApiService) {}

    ngOnInit() {
      this.headers= this.http.getHeader('logs');
    }

  // setOperate
  headers: Array<cell> = [];
  data: Array<any> = [];
  searchBtn: boolean = true;
  paginationBtn: boolean = true;
  setOperate: boolean = false;

  onSort(sort: sortObj) {
      this.http.postLogSort(sort.id,sort.order).then(data=>{
          console.log(data,'排序');
          this.data=data['data'];
      });
  }

  onSearch(searchObj: searchObj) {
      console.log('log searchObj:',searchObj);
        // this.selectValue = searchObj.selectValue;
        // this.searchValue = searchObj.searchValue;
      this.http.postLogSearch(searchObj.selectValue,searchObj.searchValue).then(data => {
          console.log('log Search result:',data);
          this.data = data['data'];
      });
  }
}
