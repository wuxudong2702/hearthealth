import {Component, OnInit, NgModule, Input, Output, EventEmitter, HostListener} from '@angular/core';
import {NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
import {DatepickerI18n, DatepickerI18nType} from '../../../../shared/datepickerI18n/datepickerI18n';
import {ApiService} from '../../../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';
import {ToastService} from '../../../../shared/toast/toast.service';
import {ToastConfig, ToastType} from '../../../../shared/toast/toast-model';

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

  dateList: Array<any>;
  valueList: Array<any>;
  chartOption: object = {};
  userInfo: string;
  field: string;
  dataChart: Array<any>;
  chartDetailsData: Array<any>;
  isDetails: boolean = false;
  userSelectName: string;
  userSelectIndex: number;
  chartDetailsId: string;
  selectedDateStart;
  selectedDateEnd;
  constructor(private http: ApiService, private toastService: ToastService) {
  }

  chartToggle(dataChart: Array<any>) {
    this.dateList = this.dataChart.map(function (item) {
      return item[0];
    });
    this.valueList = this.dataChart.map(function (item) {
      return item[1];
    });

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
              data: this.dateList
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
              data: this.valueList
          }]
        };
  }
  datePickerConfig = {
    locale: 'zh-CN',
    format:"YYYY-MM-DD"
  };

  ngOnInit() {
    this.dataChart = this.dataChart1[0];
    this.chartToggle(this.dataChart);
    this.userInfo = this.userName;

  }

  chartView() {
    this.onChart.emit();
  }

  startTime(){
      if(this.selectedDateStart && this.selectedDateEnd){
          this.http.getHhrDataChart(this.chartId,this.selectedDateStart,this.selectedDateEnd,this.field).then(data => {
              console.log(data,'data');
              console.log('-----',this.chartId,this.selectedDateStart,this.selectedDateEnd,this.field);
              if (data['status'] == 'ok') {
                  this.dataChart1 = data['data'];
                  console.log(this.dataChart1,'dataChart1');
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

  indicator1() {
    this.dataChart = this.dataChart1[0];
    this.chartToggle( this.dataChart);
    this.field='n_total_detbeat';
  }

  indicator2() {
    this.dataChart = this.dataChart1[1];
    this.chartToggle( this.dataChart);
      this.field='indicator2';

  }

  indicator3() {
    this.dataChart = this.dataChart1[2];
    this.chartToggle( this.dataChart);
      this.field='indicator3';
  }

  indicator4() {
    this.dataChart = this.dataChart1[3];
    this.chartToggle( this.dataChart);
      this.field='indicator4';
  }

  indicator5() {
    this.dataChart = this.dataChart1[4];
    this.chartToggle( this.dataChart);
      this.field='indicator5';
  }

  clear(){
      this.onDelDetails.emit(this.chartDetailsId);
      console.log(this.chartDetailsId);
      this.isDetails=false;
  }
  chartClick(e){
      // console.log(e);
      this.userSelectName = e.name;
      this.userSelectIndex = e.dataIndex;
      this.http.getHhrDataDetails().then(data => {
          this.chartDetailsData = data['data'][this.userSelectIndex][this.userSelectName ];
          this.chartDetailsId = data['data'][this.userSelectIndex]['id'];
          this.chartDetailsData.forEach(function (v) {
              if(v['key']=="int nBpmCode"){
                switch(v['value']){
                    case 0 :  v['value']="过慢"; break;
                    case 1 :  v['value']="正常"; break;
                    case 2 :  v['value']="过快"; break;
                    default:  v['value']="";
                }
              }
              if(v['key']=="int nArrhythmiaCode"){
                switch(v['value']){
                    case 0 :  v['value']="正常"; break;
                    case 1 :  v['value']="隐患"; break;
                    case 2 :  v['value']="高风险"; break;
                    default:  v['value']="";
                }
              }
          });
      });
      this.isDetails=true;
  }

  @HostListener('window:resize')
  onWindowResize(): void {}

}


