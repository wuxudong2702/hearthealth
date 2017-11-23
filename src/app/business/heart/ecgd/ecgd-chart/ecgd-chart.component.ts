import {Component, OnInit, NgModule, Input, Output, EventEmitter,HostListener} from '@angular/core';

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
                  backgroundColor: '#ccc'
              }
          },
          grid: [
              {
                  left: '10%',
                  right: '8%',
                  top:'8%',
                  // bottom: 150,
                  height:'50%',
                  borderColor:'#FF6347'
              }
          ],
          xAxis: [
              {
                  type: 'category',
                  data: this.dateList,
                  scale: true,
                  boundaryGap : false,
                  axisLine: {onZero: false},
                  splitLine: {
                      show: true,
                      lineStyle:{
                          color: '#FF6347',//网格线颜色
                          width: 1,//网格线宽度
                          type: 'solid'//网格线样式

                      },
                      interval:40
                  },
                  // splitNumber: 1,
                  // splitArea : {
                  //     show : true,
                  //     areaStyle:{
                  //        color:'#ccc'
                  //     }
                  // },
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
                  // splitNumber: 500,
                  splitLine: {
                      show:true,
                      lineStyle:{
                      color: '#FF6347',//网格线颜色
                      width: 1,//网格线宽度
                      type: 'solid',//网格线样式
                      interval:100
                  }},
                  splitArea: {
                      show: false,
                      // areaStyle:{
                      //     color:'#ccc'
                      // }
                  }
              }
          ],
          dataZoom: [
              {
                  type: 'inside',
                  start: 0,
                  end: 4,
                  minValueSpan: 10
              },
              {
                  show: true,
                  type: 'slider',
                  // bottom: 60,
                  top:'70%',
                  start: 0,
                  end: 4,
                  minValueSpan: 10
              }
          ],
          series: [
              {
                  type: 'line',
                  hoverAnimation: false,
                  symbol:'none',
                  smooth:false,
                  data: this.valueList,
                  lineStyle : {
                      normal : {
                              color:'#000000'
                      }
                  },
              }
          ]
    }
  }

   chartView(){
     this.back.emit(1);
   }

    @HostListener('window:resize')
    onWindowResize(): void {}
}

