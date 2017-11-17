import {Component, OnInit} from '@angular/core';
import {cell, SortDirection, sortObj, DataType, searchObj} from '../../../shared/table/table-list.component';
import {ApiService} from '../../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'app-hhr',
  templateUrl: './hhr.component.html',
  styleUrls: ['./hhr.component.css'],
  providers: []
})
export class HhrComponent implements OnInit {

  constructor(private http: ApiService) {
  }

  ngOnInit() {
    this.headers = this.http.getHeader('reports');

  }

  dataChart: Array<any> = [];
  headers: Array<cell> = [];
  data: Array<any> = [];
  dataChart1: Array<any>;

  del: boolean =  false;//this.http.isHavePerm('hhr-del');
  deleteBtn: boolean = this.del;
  deleteAllBtn: boolean = this.del;

  searchBtn: boolean = true;
  detailsBtn: boolean = true;
  // editBtn: boolean = true;
  setBtn: boolean = true;
  chartBtn: boolean = true;
  paginationBtn: boolean = true;
  setOperate: boolean = true;

  showChartView: boolean = false;
  userName: string = '';

  onChart(chartId1: number) {

    this.http.getHhrDataChart().then(data => {
      console.log(data);
      this.dataChart = data['dataChart'];
      this.dataChart1 = this.dataChart[chartId1];
      this.userName = this.data[chartId1].userName;
      this.showChartView = !this.showChartView;
    });

  }

  onDel(id: number) {
    this.http.postHhrDel(id).then(data => {
      console.log(data, '删除');
      this.data = data['data'];
    });
  }

  onDelAll(checkedList: any) {
    this.http.postHhrDelAll(checkedList).then(data => {
      console.log(data, '删除全部');
      this.data = data['data'];
    });
  }

  onSort(sort: sortObj) {
    this.http.postHhrSort(sort.id, sort.order).then(data => {
      console.log(data, '排序');
      this.data = data['data'];
    });
  }

  onSearch(searchObj: searchObj) {
    console.log('hhr searchObj:', searchObj);
    // this.selectValue = searchObj.selectValue;
    // this.searchValue = searchObj.searchValue;
    this.http.postHhrSearch(searchObj.selectValue, searchObj.searchValue).then(data => {
      console.log('hhr Search result:', data);
      this.data = data['data'];
    });
  }

}
