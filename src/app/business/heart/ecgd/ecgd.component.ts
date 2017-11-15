import {Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {cell, SortDirection, sortObj, searchObj, DataType,paginationObj} from '../../../shared/table/table-list.component';
import {ApiService} from '../../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';
import {ToastService} from '../../../shared/toast/toast.service';
import {ToastConfig, ToastType} from '../../../shared/toast/toast-model';

@Component({
  selector: 'app-ecgd',
  templateUrl: './ecgd.component.html',
  styleUrls: ['./ecgd.component.css'],
  providers: []
})

export class EcgdComponent implements OnInit {

  constructor(private cdr: ChangeDetectorRef, private http: ApiService, private toastService: ToastService) {

  }

  ngOnInit(): void {
    this.headers = this.http.getHeader('heart-data');
    this.http.getEcgdData().then(data => {
      if (data['status'] == 'ok') {
        this.data = data['data']['data'];
        this.pagination.current_page=data['data']['current_page'];
        this.pagination.last_page=data['data']['last_page'];
        this.pagination.per_page=data['data']['per_page'];
        this.pagination.total=data['data']['total'];
        this.pagination.first_page_url=data['data']['first_page_url'];
        this.pagination.last_page_url=data['data']['last_page_url'];
        this.pagination.next_page_url=data['data']['next_page_url'];
        this.pagination.prev_page_url=data['data']['prev_page_url'];
        this.pagination.to=data['data']['to'];
      } else {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
        this.toastService.toast(toastCfg);
      }
    }).catch(err => {
      const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
      this.toastService.toast(toastCfg);
    });
    // this.http.getDevHeader().then(data => {
    //
    //   if (data.status == 'ok') {
    //     this.headers=data['headers'];
    //   } else {
    //     const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
    //     this.toastService.toast(toastCfg);
    //     // this.router.navigate(['/login']);
    //   }
    // }).catch(err => {
    //   const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
    //   this.toastService.toast(toastCfg);
    // });
    // this.http.getDevData().then(data => {
    //   if (data.status == 'ok') {
    //     this.data = data['data'];
    //   } else {
    //     const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
    //     this.toastService.toast(toastCfg);
    //     // this.router.navigate(['/login']);
    //   }
    // }).catch(err => {
    //   const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
    //   this.toastService.toast(toastCfg);
    // });
  }

  headers: Array<cell> = [];
  data: Array<any>[];
  result: Array<any> = [];
  dataChart: Array<any> = [];
  dataChart1: Array<any> = [];

  pagination:paginationObj =  new paginationObj();

  userInfoChart: object;

  del: boolean = this.http.isHavePerm('ecgd-del');
  download: boolean = this.http.isHavePerm('ecgd-download');
  deleteBtn: boolean = this.del;
  deleteAllBtn: boolean = this.del;
  downloadBtn: boolean = this.download;

  searchBtn: boolean = true;
  detailsBtn: boolean = true;
  setBtn: boolean = true;
  chartBtn: boolean = true;
  paginationBtn: boolean = true;
  setOperate: boolean = true;
  showChartView: boolean = false;

  onChart(chartId: number) {
    this.http.getEcgdDataChart().then(data => {
      this.dataChart = data['dataChart'];
      this.dataChart1 = this.dataChart[chartId];
      this.userInfoChart = this.data[chartId];
      this.showChartView = !this.showChartView;
    });
  }

  onSort(sort: sortObj) {
    console.log(sort, '3456789');
    this.http.postEcgdSort(sort.id, sort.order).then(data => {
      this.data = data['data'];
    });
  }


  onSearch(searchObj: searchObj) {
    console.log(searchObj, 'ecgd Search searchObj');
    this.http.postEcgdSearch(searchObj.selectValue, searchObj.searchValue).then(data => {
      console.log(data, 'ecgd Search result');
      this.data = data['data'];
    });
  }

  onUpload() {
    console.log('upload');

  }

  paginationChange(parmas){
    this.http.getEcgdData(parmas['url'],parmas['per_page']).then(data => {
      if (data['status'] == 'ok') {
        this.data = data['data']['data'];
        this.pagination.current_page=data['data']['current_page'];
        this.pagination.last_page=data['data']['last_page'];
        this.pagination.per_page=data['data']['per_page'];
        this.pagination.total=data['data']['total'];
        this.pagination.first_page_url=data['data']['first_page_url'];
        this.pagination.last_page_url=data['data']['last_page_url'];
        this.pagination.next_page_url=data['data']['next_page_url'];
        this.pagination.prev_page_url=data['data']['prev_page_url'];
        this.pagination.to=data['data']['to'];
      } else {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
        this.toastService.toast(toastCfg);
      }
    }).catch(err => {
      const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
      console.error(err);
      this.toastService.toast(toastCfg);
    });
  }



}
