import {Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {
  cell,
  SortDirection,
  sortObj,
  searchObj,
  DataType,
  paginationObj, params
} from '../../../shared/table/table-list.component';
import {ApiService} from '../../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';
import {ToastService} from '../../../shared/toast/toast.service';
import {ToastConfig, ToastType }from '../../../shared/toast/toast-model';
import {AlertConfig, AlertType} from '../../../shared/modal/modal-model';
import {ModalService} from '../../../shared/modal/modal.service';
import {isNullOrUndefined} from "util";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-ecgd',
  templateUrl: './ecgd.component.html',
  styleUrls: ['./ecgd.component.css'],
  providers: []
})

export class EcgdComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private modalService: ModalService,
              private cdr: ChangeDetectorRef,
              private http: ApiService,
              private toastService: ToastService) {}

  ngOnInit(): void {

    const id: Observable<string> = this.route.params.map(p => p.id);
    id.subscribe((id)=>{
      console.log(id);
      if (this.http.hasToken()) {
        this.headers = this.http.getHeader('heart-data');
        this.params['page']='1';
        this.params['find_key']='user_id';
        this.params['find_val']= id;
        this.getHeartData(this.url,this.params);
        this.http.isHavePerm('ecgd-del').then(v => {
          this.deleteBtn = v;
          this.deleteAllBtn = v;
        });
        this.http.isHavePerm('ecgd-download').then(v => {
          this.downloadBtn = v;
        });
      }
    });


  }

  headers: Array<cell> = [];
  data: Array<any>[];
  result: Array<any> = [];
  dataChart1: Array<any> = [];
  mainInfoArr: Array<any> = [];
  userName: string;
  userId: string;
  chartId: string;
  mainInfo: string;
  sense_time: any;
  Params: any;
  deleteBtn: boolean = false;
  deleteAllBtn: boolean = false;
  downloadBtn: boolean = false;
  searchBtn: boolean = true;
  detailsBtn: boolean = true;
  setBtn: boolean = true;
  mainAccountBtn: boolean = true;
  chartBtn: boolean = true;
  paginationBtn: boolean = true;
  setOperate: boolean = true;
  showChartView: boolean = false;
  downloadData: Array<any>;

  pagination: paginationObj = new paginationObj();

  url: string = '/api/admin/heart/index';
  params:params=new params();

  chart(params) {
    this.Params = params;
    this.userId = ''+params['id'];
    this.chartId = params['chart_id'];
    this.http.getEcgdDataChart(''+params['id']).then(data => {
      if (data['status'] == 'ok') {
        this.dataChart1 = data['data'].map(v => {
          return v * 0.002;
        });
        this.showChartView = !this.showChartView;
      } else {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
        this.toastService.toast(toastCfg);
      }
    }).catch(err => {
      const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
      this.toastService.toast(toastCfg);
    });
  }


  back() {


    this.showChartView = !this.showChartView;
  }

  //用户下载的时间转换函数
  formatDate(time: any) {
    const Dates = new Date(time);
    const year: number = Dates.getFullYear();
    const month: any = ( Dates.getMonth() + 1 ) < 10 ? '0' + ( Dates.getMonth() + 1 ) : ( Dates.getMonth() + 1 );
    const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
    return year + '-' + month + '-' + day;
  }

  download(arr: Array<any>) {
    let link = document.createElement("a");
    let userId = '';
    let downloadData;
    if (arr.length) {
      this.http.ecgdDownloadData(arr[0]).subscribe(data => {
        // Blob转化为链接
        link.setAttribute("href", window.URL.createObjectURL(data));
        this.data.forEach(v => {
          if (v['heart_data_id'] == arr[0]) {
            downloadData = v;
            userId = v['user_id'];
            return;
          }
        });
        link.setAttribute("download", downloadData['name'] + '_' + downloadData['mobile'] + '_' + this.formatDate(new Date().getTime()) + '.txt');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        //诊断结果下载
        this.http.ecgdDownloadReportDetails(arr[0], userId).subscribe(data => {
          link.setAttribute("href", window.URL.createObjectURL(data));
          link.setAttribute("download", downloadData['name'] + '_' + '诊断结果_' + downloadData['mobile'] + '_' + this.formatDate(new Date().getTime()) + '.txt');
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          arr.splice(0, 1);
          this.download(arr);
        });
      });
    }
  }


  del(ids: string) {
    this.http.ecgdDelData(ids).then(data => {
      if (data['status'] == 'ok') {
        this.params['page']='1';
        this.getHeartData(this.url,this.params);

      } else {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
        this.toastService.toast(toastCfg);
      }
    }).catch(err => {
      const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
      this.toastService.toast(toastCfg);
    });
  }


  delAll(arr: Array<any>) {
    if (arr.length) {
      this.http.ecgdDelData('' + arr[0]).then(data => {
        if (data['status'] == 'ok') {
          arr.splice(0, 1);
          if (arr.length) {
            this.delAll(arr);
          } else {
            this.params['page']='1';
            this.getHeartData(this.url,this.params);
            return;
          }
        } else {
          const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
          this.toastService.toast(toastCfg);
          return;
        }
      }).catch(err => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
        this.toastService.toast(toastCfg);
      });
    }
  }

  showMainAccount (id: string) {

    this.http.showEcgdAccount(id).then(data => {
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
                this.mainInfoArr[i] = '&nbsp;&nbsp;&nbsp;';
              }
            }
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
    this.http.setHeader('heart-data', set).then(v => v).then(w => {
      this.headers = this.http.getHeader('heart-data');
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
