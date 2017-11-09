import { Component, OnInit , ViewChild , Input , Output , EventEmitter} from '@angular/core';
import { ZtreeComponent } from '../../../../shared/ztree/ztree.component'
import {ApiService} from '../../../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-admin-ztree',
  templateUrl: './admin-ztree.component.html',
  styleUrls: ['./admin-ztree.component.css'],
  providers:[ApiService]

})
export class AdminZtreeComponent implements OnInit {

  @Input() nodes :any ;
  @Output() onEdit = new EventEmitter<any>();

  constructor(private http: ApiService) {}

  ngOnInit() {}

  @ViewChild('ztreeInstance') ztreeInstance: ZtreeComponent;

  // nodes:any = this.nodes2;
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
  CheckedNodes: Array<any> =[];//存放被选择的数据
  onBack() {
      //返回按钮
      this.onEdit.emit(1);
  };

  getCheckedData() {
      //确定按钮
      //通过ZtreeComponent抛出来的getZtreeInstance()方法访问ztree函数
     this.CheckedNodes = this.ztreeInstance.getTreeInstance().getCheckedNodes(true);
     console.info('选择的数据：',this.CheckedNodes);
     this.onEdit.emit(2);
  }


}
