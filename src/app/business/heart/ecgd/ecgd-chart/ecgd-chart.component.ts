import {Component, OnInit, NgModule, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-ecgd-chart',
  templateUrl: './ecgd-chart.component.html',
  styleUrls: ['./ecgd-chart.component.scss']
})
export class EcgdChartComponent implements OnInit {

  @Input() dataChart1: Array<any>;
  @Input() userInfoChart: object;

  @Output() onChart = new EventEmitter<any>();

  dateList: Array<any>;
  valueList: Array<any>;
  chartOption: object = {};
  userInfo:object;

  constructor() {
  }

  ngOnInit() {
    this.dateList = this.dataChart1.map(function (item) {
      return item[0];
    });
    this.valueList = this.dataChart1.map(function (item) {
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
    this.userInfo=this.userInfoChart;
    // console.log(this.userInfo)
  }

   chartView(){
     this.onChart.emit(1);
   }

  single: any[];
  multi: any[];

  // view: any[] = [700, 400];

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


  // chartOption = {
  //   title: {
  //     text: '堆叠区域图'
  //   },
  //   tooltip : {
  //     trigger: 'axis'
  //   },
  //   legend: {
  //     data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
  //   },
  //   toolbox: {
  //     feature: {
  //       saveAsImage: {}
  //     }
  //   },
  //   grid: {
  //     left: '3%',
  //     right: '4%',
  //     bottom: '3%',
  //     containLabel: true
  //   },
  //   xAxis : [
  //     {
  //       type : 'category',
  //       boundaryGap : false,
  //       data : ['周一','周二','周三','周四','周五','周六','周日']
  //     }
  //   ],
  //   yAxis : [
  //     {
  //       type : 'value'
  //     }
  //   ],
  //   series : [
  //     {
  //       name:'邮件营销',
  //       type:'line',
  //       stack: '总量',
  //       areaStyle: {normal: {}},
  //       data:[120, 132, 101, 134, 90, 230, 210]
  //     },
  //     {
  //       name:'联盟广告',
  //       type:'line',
  //       stack: '总量',
  //       areaStyle: {normal: {}},
  //       data:[220, 182, 191, 234, 290, 330, 310]
  //     },
  //     {
  //       name:'视频广告',
  //       type:'line',
  //       stack: '总量',
  //       areaStyle: {normal: {}},
  //       data:[150, 232, 201, 154, 190, 330, 410]
  //     },
  //     {
  //       name:'直接访问',
  //       type:'line',
  //       stack: '总量',
  //       areaStyle: {normal: {}},
  //       data:[320, 332, 301, 334, 390, 330, 320]
  //     },
  //     {
  //       name:'搜索引擎',
  //       type:'line',
  //       stack: '总量',
  //       label: {
  //         normal: {
  //           show: true,
  //           position: 'top'
  //         }
  //       },
  //       areaStyle: {normal: {}},
  //       data:[820, 932, 901, 934, 1290, 1330, 1320]
  //     }
  //   ]
  // }


}

