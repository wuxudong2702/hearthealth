import {Component, OnInit, NgModule, Input, Output, EventEmitter} from '@angular/core';
import {NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
import {DatepickerI18n, DatepickerI18nType} from '../../../../shared/datepickerI18n/datepickerI18n';

@Component({
  selector: 'app-hhr-chart',
  templateUrl: './hhr-chart.component.html',
  styleUrls: ['./hhr-chart.component.css'],
  providers: [DatepickerI18nType, {provide: NgbDatepickerI18n, useClass: DatepickerI18n}]
})
export class HhrChartComponent implements OnInit {

  @Input() dataChart1: Array<any>;
  @Input() userName: string;

  @Output() onChart = new EventEmitter<any>();

  dateList: Array<any>;
  valueList: Array<any>;
  chartOption: object = {};
  userInfo: string;
  dataChart: Array<any>;

  selectedDateStart;
  selectedDateEnd;
  constructor() {
  }

  chartToggle(dataChart: Array<any>) {
    this.dateList = this.dataChart.map(function (item) {
      return item[0];
    });
    this.valueList = this.dataChart.map(function (item) {
      return item[1];
    });
    this.chartOption = {

      // Make gradient line here
      visualMap: [{
        show: false,
        type: 'continuous',
        seriesIndex: 0,
        min: 0,
        max: 400
      }, {
        show: false,
        type: 'continuous',
        seriesIndex: 1,
        dimension: 0,
        min: 0,
        max: this.dateList.length - 1
      }],
      title: [{
        left: 'center',
        text: ''
      }],
      tooltip: {
        trigger: 'axis'
      },
      xAxis: [
        {
          data: this.dateList
        },
        {
          //data: this.dateList,
          gridIndex: 1
        }
      ],
      yAxis: [{
        splitLine: {show: false}
      }, {
        splitLine: {show: false},
        gridIndex: 1
      }],
      grid: [{
        bottom: '15%'
      }, {
        top: '70%'
      }],
      series: [
        {
          type: 'line',
          showSymbol: true,
          data: this.valueList
        },
        {
          type: 'line',
          showSymbol: false,
          xAxisIndex: 1,
          yAxisIndex: 1
        }
      ]
    };
  }
  datePickerConfig = {
    locale: 'zh-CN'
  };

  ngOnInit() {
    this.dataChart = this.dataChart1[0];
    this.chartToggle(this.dataChart);
    this.userInfo = this.userName;
  }

  chartView() {
    this.onChart.emit(1);
  }

  indicator1() {
    this.dataChart = this.dataChart1[0];
  }

  indicator2() {
    this.dataChart = this.dataChart1[1];
    this.chartToggle( this.dataChart);
  }

  indicator3() {
    this.dataChart = this.dataChart1[2];
    this.chartToggle( this.dataChart);
  }

  indicator4() {
    this.dataChart = this.dataChart1[3];
    this.chartToggle( this.dataChart);
  }

  indicator5() {
    this.dataChart = this.dataChart1[4];
    this.chartToggle( this.dataChart);
  }

  single: any[];
  multi: any[];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  legendTitle = "图例";
  showXAxisLabel = true;
  xAxisLabel = '图家';
  showYAxisLabel = true;
  yAxisLabel = '人口';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };


}


