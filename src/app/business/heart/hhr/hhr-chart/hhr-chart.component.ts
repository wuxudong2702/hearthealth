import {Component, OnInit, NgModule, Input, Output, EventEmitter, HostListener} from '@angular/core';
import {NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
import {DatepickerI18n, DatepickerI18nType} from '../../../../shared/datepickerI18n/datepickerI18n';
import {ApiService} from '../../../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';
import {ToastService} from '../../../../shared/toast/toast.service';
import {ToastConfig, ToastType} from '../../../../shared/toast/toast-model';
import {ModalService} from '../../../../shared/modal/modal.service';
import {ConfirmConfig} from '../../../../shared/modal/modal-model';

@Component({
  selector: 'app-hhr-chart',
  templateUrl: './hhr-chart.component.html',
  styleUrls: ['./hhr-chart.component.css'],
  providers: [DatepickerI18nType, {provide: NgbDatepickerI18n, useClass: DatepickerI18n}]
})
export class HhrChartComponent implements OnInit {

  @Input() dataChart1: Array<any>;
  @Input() userName: string;
  @Input() chartId: number;

  @Output() onChart = new EventEmitter<any>();
  @Output() onTime = new EventEmitter<any>();
  @Output() onIndicators = new EventEmitter<any>();
  @Output() onDelDetails = new EventEmitter<any>();

  dataList: Array<any>;
  valueList: Array<any>;
  chartOption: object = {};
  userInfo: string;
  dataIndex: number;
  field: string='n_total_detbeat';
  dataChart: Array<any>;
  chartDetailsData: Array<any>;
  isDetails: boolean = false;
  chartDetailsId: number = 1;
  selectedDateStart;
  selectedDateEnd;
  constructor(private http: ApiService, private toastService: ToastService,private modalService: ModalService) {
  }

  chartToggle(dataList: Array<any>,valueList: Array<any>) {
    this.chartOption = {
          visualMap: [{
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 400
          }],
          title: [{
            left: 'center',
            text: ''
          }],
          tooltip: {
            trigger: 'axis'
          },
          xAxis: [{
              data: valueList
          }],
          yAxis: [{
            splitLine: {show: false}
          }],
          grid: {
            top: '15%'
          },
          series: [{
              type: 'line',
              showSymbol: true,
              data: dataList
          }]
        };
  }

  datePickerConfig = {
    locale: 'zh-CN',
    format:"YYYY-MM-DD"
  };

  ngOnInit() {}

  chartView() {
    this.onChart.emit();
  }

  indicator1() {
      this.field='n_total_detbeat';
      this.chartToggle(this.dataList,this.valueList);
  }

  indicator2() {
      this.field='indicator2';
      this.chartToggle(this.dataList,this.valueList);
  }

  indicator3() {
      this.field='indicator3';
      this.chartToggle(this.dataList,this.valueList);
  }

  indicator4() {
      this.field='indicator4';
      this.chartToggle(this.dataList,this.valueList);
  }

  indicator5() {
      this.field='indicator5';
      this.chartToggle(this.dataList,this.valueList);
  }

  show(){
      if(this.selectedDateStart && this.selectedDateEnd){
          this.http.getHhrDataChart(this.chartId,this.selectedDateStart,this.selectedDateEnd,this.field).then(data => {
              console.log(data,'-------');
              if (data['status'] == 'ok') {
                  if(data['data'].length){
                      this.dataChart1 = data['data'];
                      this.valueList = this.dataChart1.map(function (item) {
                          return item['sense_time'];
                      });
                      this.dataList = this.dataChart1.map(function (item) {
                          return item['data'];
                      });
                      this.chartToggle(this.dataList,this.valueList);
                  }else{
                      const toastCfg = new ToastConfig(ToastType.ERROR, '','暂无数据', 3000);
                      this.toastService.toast(toastCfg);
                  }
              } else {
                  const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
                  this.toastService.toast(toastCfg);
              }
          }).catch(err => {
              const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
              console.error(err);
              this.toastService.toast(toastCfg);
          });
      }else if(!this.selectedDateStart){
          const toastCfg = new ToastConfig(ToastType.ERROR, '','请选择开始时间', 3000);
          this.toastService.toast(toastCfg);
      }else if(!this.selectedDateEnd){
          const toastCfg = new ToastConfig(ToastType.ERROR, '','请选择结束时间', 3000);
          this.toastService.toast(toastCfg);
      }else if(new Date(this.selectedDateStart.replace("-","/"))>new Date(this.selectedDateEnd.replace("-","/"))){
          const toastCfg = new ToastConfig(ToastType.ERROR, '','开始时间大于结束时间！', 3000);
          this.toastService.toast(toastCfg);
      }
  }

  chartClick(e){
      // console.log(e);
      this.dataIndex = e.dataIndex;
      this.chartDetailsId = this.dataChart1[this.dataIndex]['id'];
      this.http.getHhrDataDetails(this.chartId,this.chartDetailsId).then(data => {
          if (data['status'] == 'ok') {
              if(data['data'].length){
                  this.chartDetailsId = this.dataChart1[this.dataIndex]['id'];
                  this.chartDetailsData=Object.entries(data['data']);
                  this.chartDetailsData.forEach(function (v) {
                      if(v[0]=="int nBpmCode"){
                          switch(v[1]){
                              case 0 :  v[1]="过慢"; break;
                              case 1 :  v[1]="正常"; break;
                              case 2 :  v[1]="过快"; break;
                              default:  v[1]="";
                          }
                      }
                      if(v[0]=="int nArrhythmiaCode"){
                          switch(v[1]){
                              case 0 :  v[1]="正常"; break;
                              case 1 :  v[1]="隐患"; break;
                              case 2 :  v[1]="高风险"; break;
                              default:  v[1]="";
                          }
                      }
                  });
              }else{
                  const toastCfg = new ToastConfig(ToastType.ERROR, '','暂无数据', 3000);
                  this.toastService.toast(toastCfg);
              }
          }
      }).catch(err => {
          const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
          console.error(err);
          this.toastService.toast(toastCfg);
      });
      this.isDetails=true;
  }

  clear(){
      if(this.dataIndex >= 0){
          let confirmCfg = new ConfirmConfig('您确认清空该次数据吗？');
          let result = this.modalService.confirm(confirmCfg);
          result.then(v => {
              this.http.delHhrDataDetails(this.chartId,this.chartDetailsId).then(data => {
                  if (data['status'] == 'ok') {
                      this. show();
                      this.isDetails = false;
                  }
              }).catch(err => {
                  // const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
                  // this.toastService.toast(toastCfg);
              });
          }).catch(v => {
          })
      }else{
          const toastCfg = new ToastConfig(ToastType.ERROR, '','请选择清空的数据！', 3000);
          this.toastService.toast(toastCfg);
      }
  }

  @HostListener('window:resize')
  onWindowResize(): void {}

}


