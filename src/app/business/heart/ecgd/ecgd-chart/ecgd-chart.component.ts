import {Component, OnInit, NgModule, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-ecgd-chart',
  templateUrl: './ecgd-chart.component.html',
  styleUrls: ['./ecgd-chart.component.scss']
})
export class EcgdChartComponent implements OnInit {

  @Input() dataChart1: Array<any>;
  @Input() userName: string;
  @Input() sense_time: any;

  @Output() back = new EventEmitter<any>();

  dateList: Array<any>;
  valueList: Array<any>;
  chartOption: object = {};
  userInfo:object;

  constructor() {
  }

  ngOnInit() {
    // this.dateList = this.dataChart1.map(function (item) {
    //   return item[0];
    // });
    // this.valueList = this.dataChart1.map(function (item) {
    //   return item[1];
    // });

    this.valueList=this.dataChart1;
    this.dateList=this.dataChart1.map(function (item,index) {
        return index+1;
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
        text: '心电数据波形'
      },
      //   {
      //   top: '55%',
      //   left: 'center',
      //   text: '心电数据波形'
      // }
      ],
      tooltip: {
        trigger: 'axis'
      },
      xAxis: [
        {
        data: this.dateList
      },
        {
        // data: this.dateList,
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
        // data: this.valueList,
        xAxisIndex: 1,
        yAxisIndex: 1
      }
      ]
    };
  }

   chartView(){
     this.back.emit(1);
   }

}

