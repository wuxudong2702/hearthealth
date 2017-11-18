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

    // this.chartOption = {
    //
    //   // Make gradient line here
    //   visualMap: [{
    //     show: false,
    //     type: 'continuous',
    //     seriesIndex: 0,
    //     min: 0,
    //     max: 400
    //   }, {
    //     show: false,
    //     type: 'continuous',
    //     seriesIndex: 1,
    //     dimension: 0,
    //     min: 0,
    //     max: this.dateList.length - 1
    //   }],
    //
    //
    //   title: [{
    //     left: 'center',
    //     text: '心电数据波形'
    //   },
    //   //   {
    //   //   top: '55%',
    //   //   left: 'center',
    //   //   text: '心电数据波形'
    //   // }
    //   ],
    //   tooltip: {
    //     trigger: 'axis'
    //   },
    //   xAxis: [
    //     {
    //     data: this.dateList
    //   },
    //     {
    //     // data: this.dateList,
    //     gridIndex: 1
    //   }
    //   ],
    //   yAxis: [{
    //     splitLine: {show: false}
    //   }, {
    //     splitLine: {show: false},
    //     gridIndex: 1
    //   }],
    //   grid: [{
    //     bottom: '15%'
    //   }, {
    //     top: '70%'
    //   }],
    //   series: [
    //     {
    //     type: 'line',
    //     showSymbol: true,
    //     data: this.valueList
    //   },
    //     {
    //     type: 'line',
    //     showSymbol: false,
    //     // data: this.valueList,
    //     xAxisIndex: 1,
    //     yAxisIndex: 1
    //   }
    //   ]
    // };
      this.chartOption = {

          animation: false,
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross'
              },
              backgroundColor: 'rgba(245, 245, 245, 0.8)',
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 10,
              textStyle: {
                  color: '#000'
              },
              position: function (pos, params, el, elRect, size) {
                  var obj = {top: 10};
                  obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                  return obj;
              },
              extraCssText: 'width: 170px'
          },
          axisPointer: {
              link: {xAxisIndex: 'all'},
              label: {
                  backgroundColor: '#777'
              }
          },
          grid: [
              {
                  left: '10%',
                  right: '8%',
                  bottom: 150
              }
          ],
          xAxis: [
              {
                  type: 'category',
                  data: this.dateList,
                  scale: true,
                  boundaryGap : false,
                  axisLine: {onZero: false},
                  splitLine: {show: false},
                  splitNumber: 20,
                  axisLabel: {
                      formatter: function (value, index) {
                          var date = new Date(parseInt(value));
                          var texts = [date.getMinutes(),date.getSeconds(),date.getMilliseconds()];

                          return texts.join(':');
                      }
                  }
              }
          ],
          yAxis: [
              {
                  scale: true,
                  splitArea: {
                      show: true
                  }
              }
          ],
          dataZoom: [
              {
                  type: 'inside',
                  start: 98,
                  end: 100,
                  minValueSpan: 10
              },
              {
                  show: true,
                  type: 'slider',
                  bottom: 60,
                  start: 98,
                  end: 100,
                  minValueSpan: 10
              }
          ],
          series: [
              {
                  type: 'line',
                  hoverAnimation: false,
                  symbol:'none',
                  smooth:false,
                  data: this.valueList
              }
          ]
    }
  }

   chartView(){
     this.back.emit(1);
   }

}

