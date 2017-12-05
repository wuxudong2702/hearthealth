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
  @Input() startValue: any;
  @Input() endValue: any;

  @Output() onChart = new EventEmitter<any>();
  @Output() onTime = new EventEmitter<any>();
  @Output() onIndicators = new EventEmitter<any>();
  @Output() onDelDetails = new EventEmitter<any>();

  dataList: Array<any> = [];
  valueList: Array<any> = [];
  chartOption: object = {};
  userInfo: string;
  clickTime: string;
  dataIndex: number;
  flag: number = 1;
  field: string = 'n_total_detbeat';
  dataChart: Array<any>;
  chartDetailsData: Array<any>;
  isDetails: boolean = false;
  details_none: boolean = false;
  chart_none: boolean = false;
  chartDetailsId: number = 1;
  selectedDateStart;
  selectedDateEnd;

  constructor(private http: ApiService, private toastService: ToastService, private modalService: ModalService) {
  }

  ngOnInit() {
    this.selectedDateStart = this.startValue.slice(0, 10);
    this.selectedDateEnd = this.endValue.slice(0, 10);
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
        show: false,
        trigger: 'axis'
      },
      xAxis: [{
        axisLabel: {show: false},
        data: [0]
      }],
      yAxis: [{
        axisLabel: {show: false},
        splitLine: {show: false},
        axisTick: {show: false}
      }],
      grid: {
        top: '12%'
      },
      series: [{
        type: 'line',
        showSymbol: false,
        data: [0]
      }]
    };
  }

  chartToggle(dataList: Array<any>, valueList: Array<any>) {
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
        show: true,
        trigger: 'axis'
      },
      xAxis: [{
        axisLabel: {show: true},
        data: valueList
      }],
      yAxis: [{
        splitLine: {show: false},
        axisLabel: {show: true},
        axisTick: {show: true}
      }],
      grid: {
        top: '12%',
        // height:'60%',
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
    format: "YYYY-MM-DD"
  };

  chartView() {
    this.onChart.emit();
  }

  indicator1() {
    this.field = 'n_total_detbeat';
    this.flag = 1;
    this.chartToggle(this.dataList, this.valueList);
  }

  indicator2() {
    this.field = 'indicator2';
    this.flag = 2;
    this.chartToggle(this.dataList, this.valueList);
  }

  indicator3() {
    this.field = 'indicator3';
    this.flag = 3;
    this.chartToggle(this.dataList, this.valueList);
  }

  indicator4() {
    this.field = 'indicator4';
    this.flag = 4;
    this.chartToggle(this.dataList, this.valueList);
  }

  indicator5() {
    this.field = 'indicator5';
    this.flag = 5;
    this.chartToggle(this.dataList, this.valueList);
  }

  indicator6() {
    this.field = 'indicator6';
    this.flag = 6;
    this.chartToggle(this.dataList, this.valueList);
  }

  show() {
    if (this.selectedDateStart && this.selectedDateEnd) {
      if (new Date(this.selectedDateStart.replace("-", "/")) > new Date(this.selectedDateEnd.replace("-", "/"))) {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', '开始时间大于结束时间！', 3000);
        this.toastService.toast(toastCfg);
      } else {
        //选择指标
        if (this.field) {
          this.http.getHhrDataChart(this.chartId, this.selectedDateStart, this.selectedDateEnd, this.field).then(data => {
            // console.log(data,'-------');
            if (data['status'] == 'ok') {
              if (data['data'].length) {
                this.dataChart1 = data['data'];
                this.valueList = this.dataChart1.map(function (item) {
                  return item['sense_time'];
                });
                this.dataList = this.dataChart1.map(function (item) {
                  return item['data'];
                });
                this.chartToggle(this.dataList, this.valueList);
                this.details_none = false;
                this.chart_none = false;
              } else {
                this.details_none = true;
                this.chart_none = true;
              }
            } else {
              const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
              this.toastService.toast(toastCfg);
            }
          }).catch(err => {
            const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
            // console.error(err);
            this.toastService.toast(toastCfg);
          });
        } else {
          const toastCfg = new ToastConfig(ToastType.ERROR, '', '请选择指标', 3000);
          this.toastService.toast(toastCfg);
        }
      }

    } else if (!this.selectedDateStart) {
      const toastCfg = new ToastConfig(ToastType.ERROR, '', '请选择开始时间', 3000);
      this.toastService.toast(toastCfg);
    } else if (!this.selectedDateEnd) {
      const toastCfg = new ToastConfig(ToastType.ERROR, '', '请选择结束时间', 3000);
      this.toastService.toast(toastCfg);
    }
  }

  chartClick(e) {
    // console.log(e,'e');
    this.dataIndex = e.dataIndex;
    this.clickTime = e.name;
    this.chartDetailsId = this.dataChart1[this.dataIndex]['id'];

    this.http.getHhrDataDetails(this.chartId, this.chartDetailsId).then(data => {
      if (data['status'] == 'ok') {
        if (data['data']) {
          this.chartDetailsId = this.dataChart1[this.dataIndex]['id'];
          this.chartDetailsData=[];
          for(let i  in data['data'] ){
            let arr=[];
            arr.push(i);
            arr.push(data['data'][i]);
            this.chartDetailsData.push(arr);
          }
          this.chartDetailsData.forEach(function (v) {
            if (v[0] == "bpm_code") {
              switch (v[1]) {
                case '0' :
                  v[1] = "过慢";
                  break;
                case '1' :
                  v[1] = "正常";
                  break;
                case '2' :
                  v[1] = "过快";
                  break;
                default:
                  v[1] = "";
              }
            }
            if (v[0] == "n_arrhythmia_code") {
              switch (v[1]) {
                case '0' :
                  v[1] = "正常";
                  break;
                case '1' :
                  v[1] = "隐患";
                  break;
                case '2' :
                  v[1] = "高风险";
                  break;
                default:
                  v[1] = "";
              }
            }
          });
          this.isDetails = true;
          this.details_none = false;

        } else {
          this.isDetails = true;
          this.details_none = true;
        }
      }
    }).catch(err => {
      const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
      // console.error(err);
      this.toastService.toast(toastCfg);
    });

  }

  clear() {
    if (this.dataIndex >= 0) {
      let confirmCfg = new ConfirmConfig('您确认清空该次数据吗？');
      let result = this.modalService.confirm(confirmCfg);
      result.then(v => {
        this.http.delHhrDataDetails(this.chartId, this.chartDetailsId).then(data => {
          if (data['status'] == 'ok') {
            this.show();
            this.isDetails = false;
          }
        }).catch(err => {
          // const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
          // this.toastService.toast(toastCfg);
        });
      }).catch(v => {
      })
    } else {
      const toastCfg = new ToastConfig(ToastType.ERROR, '', '请选择清空的数据！', 3000);
      this.toastService.toast(toastCfg);
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
  }

}


