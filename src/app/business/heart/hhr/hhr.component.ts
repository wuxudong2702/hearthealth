import {Component, OnInit} from '@angular/core';
import {
  cell, SortDirection, sortObj, DataType, searchObj, paginationObj, params
} from '../../../shared/table/table-list.component';
import {ApiService} from '../../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';
import {ToastService} from '../../../shared/toast/toast.service';
import {ToastConfig, ToastType} from '../../../shared/toast/toast-model';

@Component({
  selector: 'app-hhr',
  templateUrl: './hhr.component.html',
  styleUrls: ['./hhr.component.css'],
  providers: []
})
export class HhrComponent implements OnInit {

  constructor(private http: ApiService, private toastService: ToastService) {
  }

  ngOnInit() {
    if(this.http.hasToken()){
        this.headers = this.http.getHeader('reports');
      this.params['page']='1';
      this.getHeartData(this.url,this.params);
    }
  }

  dataChart: Array<any> = [];
  headers: Array<cell> = [];
  data: Array<any> = [];
  dataChart1: Array<any>;
  startValue: any;
  endValue: any;
  field: string;

  searchBtn: boolean = true;
  detailsBtn: boolean = true;
  // editBtn: boolean = true;
  setBtn: boolean = true;
  chartBtn2: boolean = true;
  paginationBtn: boolean = true;
  setOperate: boolean = true;

  showChartView: boolean = false;
  userName: string = '';
  chartId: number;
  pagination: paginationObj = new paginationObj();

  url: string = '/api/admin/report/index';
  params:params=new params();


  chart(data) {
      // console.log(this.data,'this.data');
      this.userName = data.name;
      this.chartId = data.id;
      this.startValue = this.data[data.i]['earliest'];
      this.endValue = this.data[data.i]['latest'];
      this.showChartView = !this.showChartView;
  }

  chartBack() {
    this.showChartView = !this.showChartView;
  }

  set (set: string) {
    this.http.setHeader('reports', set).then(v => v).then(w => {
      this.headers = this.http.getHeader('reports');
    });
  }

  sort(sort: sortObj) {
    this.params['sort_key'] = sort.key;
    this.params['sort_val'] = sort.val;
    this.getHeartData(this.url,this.params);
  }

  search(searchObj: searchObj) {
    this.params['find_key']=searchObj.selectValue;
    this.params['find_val']=searchObj.searchValue;
    this.params['page']='1';
    this.getHeartData(this.url,this.params);
  }

  paginationChange(params) {
    this.params['page']=params['page'];
    this.params['count'] =params['per_page'];
    this.getHeartData(this.url,this.params);
  }

  getHeartData(url,params){
    this.http.getTableData(url,params).then(data => {
      if (data['status'] == 'ok') {
        this.data = data['data'];
        this.pagination =data['pagination'];
      } else {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', data['message'], 3000);
        this.toastService.toast(toastCfg);
      }
    }).catch(err => {
      const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
      this.toastService.toast(toastCfg);
    });
  }

}
