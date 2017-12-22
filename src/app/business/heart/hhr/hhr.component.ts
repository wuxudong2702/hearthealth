import {Component, OnInit} from '@angular/core';
import {
  cell, SortDirection, sortObj, DataType, searchObj, paginationObj, params
} from '../../../shared/table/table-list.component';
import {ApiService} from '../../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';
import {ToastService} from '../../../shared/toast/toast.service';
import {ToastConfig, ToastType} from '../../../shared/toast/toast-model';
import {AlertConfig, AlertType} from '../../../shared/modal/modal-model';
import {ModalService} from '../../../shared/modal/modal.service';
import {isNullOrUndefined} from "util";
import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import {Observable} from "rxjs/Observable";
@Component({
  selector: 'app-hhr',
  templateUrl: './hhr.component.html',
  styleUrls: ['./hhr.component.css'],
  providers: []
})
export class HhrComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private modalService: ModalService,
    private http: ApiService,
    private toastService: ToastService
  ) {

  }

  ngOnInit() {
    const id: Observable<string> = this.route.params.map(p => p.id);
    id.subscribe((id)=>{
      console.log(id);
      if(this.http.hasToken()){
        this.headers = this.http.getHeader('reports');
        this.params['page']='1';
        this.params['find_key']='id';
        this.params['find_val']= id;
        this.getHeartData(this.url,this.params);
      }
    });



    // this.route.paramMap
    //   .switchMap((params: ParamMap) => {console.log(+params.get('id'))})
    //   .subscribe();
  }

  dataChart: Array<any> = [];
  headers: Array<cell> = [];
  data: Array<any> = [];
  mainInfoArr: Array<any> = [];
  dataChart1: Array<any>;
  startValue: any;
  endValue: any;
  field: string;
  mainInfo: string;

  searchBtn: boolean = true;
  detailsBtn: boolean = true;
  // editBtn: boolean = true;
  mainAccountBtn: boolean = true;
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

  showMainAccount (id: string) {

    this.http.showReportAccount(id).then(data => {
      if (data['status'] == 'ok') {

        if(id == data['data']['id']){
          const alertCfg = new AlertConfig(AlertType.INFO, '主用户信息', '当前用户为主用户');
          this.modalService.alert(alertCfg);
        }else{
          this.mainInfoArr.push(data['data']['id']);
          this.mainInfoArr.push(data['data']['name']);
          this.mainInfoArr.push(data['data']['mobile']);
          this.mainInfoArr.push(data['data']['qq']);
          this.mainInfoArr.push(data['data']['wexin']);
          for(let i=0;i<this.mainInfoArr.length;i++){
            if(isNullOrUndefined(this.mainInfoArr[i])){
              this.mainInfoArr[i] = '';
            }
          }
          //            "<label><h5>主用户信息</h5></label>\n"+

          this.mainInfo="<div>\n" +
            "  <label>ID :&nbsp;"+this.mainInfoArr[0]+"</label>\n" +
            "  <label>用户名 :&nbsp;"+this.mainInfoArr[1]+"</label>\n" +
            "  <label>QQ :&nbsp;"+this.mainInfoArr[3]+"</label>\n" +
            "  <label>微信 :&nbsp;"+this.mainInfoArr[4]+"</label>\n" +
            "  <label>手机 :&nbsp;"+this.mainInfoArr[2]+"</label>\n" +
            "</div>";
          const alertCfg = new AlertConfig(AlertType.INFO,'主用户信息',this.mainInfo);
          this.modalService.alert(alertCfg);
        }
      } else {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', data['message'], 3000);
        this.toastService.toast(toastCfg);
      }
    }).catch(err => {
      const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
      this.toastService.toast(toastCfg);
    });
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
