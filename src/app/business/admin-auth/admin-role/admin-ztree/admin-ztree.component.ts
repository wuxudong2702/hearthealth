import { Component, OnInit , ViewChild , Input , Output , EventEmitter} from '@angular/core';
import { ZtreeComponent } from '../../../../shared/ztree/ztree.component'

@Component({
  selector: 'app-admin-ztree',
  templateUrl: './admin-ztree.component.html',
  styleUrls: ['./admin-ztree.component.css']
})
export class AdminZtreeComponent implements OnInit {

  @Output() onEdit = new EventEmitter<any>();

  ngOnInit() {
  }

  @ViewChild('ztreeInstance') ztreeInstance: ZtreeComponent;

  setting: any = {
      check: {
          enable: true
      },
      view: {
          showLine: true,
          showIcon: false,
          fontCss: { color:"#2894FF"}
      },
      callback: {

          onClick: function (event, treeId, treeNode, clickFlag) {
              console.info(treeNode);
          },
          onCheck: function (e, treeId, treeNode) {
              console.info(treeNode);
          }
      }
  };
  nodes: any = [
      {
          id: "1",
          checked: true,
          open:true,
          name: "心电后台管理系统",
          children: [
              { id: "2", name: "心电数据", checked: true , open:true , children:[
                  { id: "3", name: "心电波形" , checked: true, children:[
                      { id: "4", name: "删除功能" , checked: true },
                      { id: "5", name: "下载功能" , checked: true }
                  ]},
                  { id: "6", name: "健康档案" , checked: true , children:[
                      { id: "7", name: "删除功能" , checked: true }
                  ]}
              ]},
              { id: "8", name: "设备管理"  , checked: true , open:true , children:[
                  { id: "9", name: "心电设备" , checked: true , children:[
                      { id: "10", name: "添加功能" , checked: true },
                      { id: "11", name: "编辑功能" , checked: true },
                      { id: "12", name: "删除功能" , checked: true }
                  ]}
              ]},
              { id: "13", name: "信息管理"  , checked: true , open:true , children:[
                  { id: "14", name: "公共信息" , checked: true , children:[
                      { id: "15", name: "添加功能" , checked: true },
                      { id: "16", name: "编辑功能" , checked: true },
                      { id: "17", name: "删除功能" , checked: true }
                  ]},
                  { id: "18", name: "健康资讯" , checked: true , children:[
                      { id: "19", name: "添加功能" , checked: true },
                      { id: "20", name: "编辑功能" , checked: true },
                      { id: "21", name: "删除功能" , checked: true }
                  ]},
                  { id: "22", name: "商城信息" , checked: true , children:[
                      { id: "23", name: "添加功能" , checked: true },
                      { id: "24", name: "编辑功能" , checked: true },
                      { id: "25", name: "删除功能" , checked: true }
                  ]},
              ]},
              { id: "26", name: "APP升级"  , checked: true , open:true , children:[
                  { id: "28", name: "App包管理" , checked: true , children:[
                      { id: "29", name: "添加功能" , checked: true },
                      { id: "30", name: "编辑功能" , checked: true },
                      { id: "31", name: "删除功能" , checked: true }
                  ]}
              ]},
              { id: "32", name: "App权限" , checked: true , open:true , children:[
                  { id: "33", name: "App用户" , checked: true , children:[
                      { id: "34", name: "添加功能" , checked: true },
                      { id: "35", name: "编辑功能" , checked: true },
                      { id: "36", name: "删除功能" , checked: true }
                  ]},
                  { id: "37", name: "App角色" , checked: true , children:[
                      { id: "38", name: "添加功能" , checked: true },
                      { id: "39", name: "编辑功能" , checked: true },
                      { id: "40", name: "删除功能" , checked: true }
                  ]}
              ]},
              { id: "41", name: "后台权限"  , checked: true , open:true , children:[
                  { id: "42", name: "后台用户" , checked: true , children:[
                      { id: "43", name: "添加功能" , checked: true },
                      { id: "44", name: "编辑功能" , checked: true },
                      { id: "45", name: "删除功能" , checked: true }
                  ]},
                  { id: "46", name: "后台角色" , checked: true , children:[
                      { id: "47", name: "添加功能" , checked: true },
                      { id: "48", name: "编辑功能" , checked: true },
                      { id: "49", name: "删除功能" , checked: true }
                  ]}
              ]},
              { id: "50", name: "日志管理"  , checked: true , open:true , children:[
                  { id: "51", name: "系统日志" , checked: true , children:[
                      { id: "52", name: "查询功能" , checked: true }
                  ]}
              ]}
          ]
      }
  ];
  CheckedNodes: Array<any> =[];
  onBack() {
      this.onEdit.emit(1);
  };
  constructor() {}
  getCheckedData() {
        //通过ZtreeComponent抛出来的getZtreeInstance()方法访问ztree函数
     this.CheckedNodes = this.ztreeInstance.getTreeInstance().getCheckedNodes(true);
     console.info('选择的数据：',this.CheckedNodes);
     this.onEdit.emit(2);
  }


}
