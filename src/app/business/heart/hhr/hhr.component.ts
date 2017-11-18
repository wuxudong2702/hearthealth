import {Component, OnInit} from '@angular/core';
import {
  cell, SortDirection, sortObj, DataType, searchObj, paginationObj} from '../../../shared/table/table-list.component';
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
    this.headers = this.http.getHeader('reports');
    this.getHeartData();
  }

  dataChart: Array<any> = [];
  headers: Array<cell> = [];
  data: Array<any> = [];
  dataChart1: Array<any>;
  start_time: any;
  end_time: any;
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


  per_page: string=null;
  find_key: string=null;
  find_val: string=null;
  sort_key: string=null;
  sort_val: string=null;
  url: string = '/api/admin/report/index';


  chart(id) {
    // this.http.getHhrDataChart().then(data => {
    //   console.log('data', data);
    //   this.dataChart = data['dataChart'];
    //   this.dataChart1 = this.dataChart[0];
    //   this.userName = this.data[0].userName;
    // });
      console.log(id,'id');
      // this.userName = params['name'];
      this.chartId = id;
      this.showChartView = !this.showChartView;
  }

  chartBack() {
    this.showChartView = !this.showChartView;
  }


  sort(sort: sortObj) {
    this.sort_key = sort.key;
    this.sort_val = sort.val;
    this.getHeartData(this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
  }

  del(ids: string) {
    this.http.ecgdDelData(ids).then(data => {
      if (data['status'] == 'ok') {
        this.getHeartData();
      } else {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
        this.toastService.toast(toastCfg);
      }
    }).catch(err => {
      const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
      this.toastService.toast(toastCfg);
    });
  }

  search(searchObj: searchObj) {
    this.find_val = searchObj.searchValue;
    this.find_key = searchObj.selectValue;
    this.getHeartData(this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
  }

  paginationChange(parmas) {
    this.per_page = parmas['per_page'];
    if(parmas['url']!=undefined){
      this.url = parmas['url'];
    }
    this.getHeartData( this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
  }

  set (set: string) {
    this.http.setHeader('reports', set).then(v => v).then(w => {
      this.headers = this.http.getHeader('reports');
    });
  }

  getHeartData(url: string = this.url, per_page: string = this.per_page, find_key: string = this.find_key, find_val: string = this.find_val, sort_key: string = this.sort_key, sort_val: string = this.sort_val) {
    this.http.getData(url, per_page, find_key, find_val, sort_key, sort_val).then(data => {
      if (data['status'] == 'ok') {
        this.data = data['data']['data'];
        this.pagination.current_page = data['data']['current_page'];
        this.pagination.last_page = data['data']['last_page'];
        this.pagination.per_page = data['data']['per_page'];
        this.pagination.total = data['data']['total'];
        this.pagination.first_page_url = data['data']['first_page_url'];
        this.pagination.last_page_url = data['data']['last_page_url'];
        this.pagination.next_page_url = data['data']['next_page_url'];
        this.pagination.prev_page_url = data['data']['prev_page_url'];
        this.pagination.to = data['data']['to'];
      } else {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
        this.toastService.toast(toastCfg);
      }
    }).catch(err => {
      const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
      this.toastService.toast(toastCfg);
    });
  }

}
