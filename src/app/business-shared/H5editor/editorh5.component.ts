import {Component, Inject, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {AppService} from '../../app.service';
import {DOCUMENT} from '@angular/common';
import {news} from '../../shared/table/table-list.component';
import {ToastService} from '../../shared/toast/toast.service';
import {ToastConfig, ToastType} from '../../shared/toast/toast-model';

export class UEditorHtml {
  htmlValue: string;
  textValue: string;
  delta: string;
  source: string;
}

const htmlH: string = "<!DOCTYPE html>\n" +
  "<html>\n" +
  "<head>\n" +
  "  <meta charset=\"UTF-8\">\n" +
  "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0\">\n" +
  "</head>\n" +
  "<body>\n" +
  "<style>\n" +
  "  .article-content{font-size: 1.1em;padding: 10px 10px 30px;color: #000000;}\n" +
  "\n" +
  "  .article-content p{\n" +
  "    word-wrap: break-word;line-height: 1.2em;margin: 20px 0 0 0;text-indent: 1.8em;\n" +
  "  }\n" +
  "  .article-content img {max-width: 100%;display: block;margin: 0 auto;border-radius: 4px; }\n" +
  "</style>\n" +

  "<div class=\"article-content\">";

const htmlL: string = "</div>\n" +
  "\t\n" +
  "</body>\n" +
  "</html>";
const htmlTitle = "<div class=\"article-title\">\n" +
  "  <h1 class=\"title\">我是预览页面</h1>\n" +
  "</div>\n";

@Component({
  selector: 'c-editor-h5',
  styleUrls: ['./editorh5.component.css'],
  template: `
      <!--<div class="col-md-2 h5Select">-->
      <!--<select class="form-control" [(ngModel)]="selectValue" [hidden]="!isSelectShow">-->
      <!--<option value="" style="display:none">请选择类别</option>-->
      <!--<option *ngFor="let type of H5Type" value={{type.key}}>{{type.value}}</option>-->
      <!--</select>-->
          <!--<div class="form-group">-->
              <!--<div>标签：<input class="form-control" type="text" [(ngModel)]="label"></div>-->
              <!--<div>标题：<input class="form-control" type="text" [(ngModel)]="title"></div>-->
              <!--<div>描述：<input class="form-control" type="text" [(ngModel)]="description"></div>-->
          <!--</div>-->
    <!--</div>-->
  <div  style="background-color: white">
    <div class="form-group" style="margin-top: 12px;">
        <div style="margin-left: 2%;">
            <label>标签：</label><input style="border: 1px solid #dddddd;width: 33%;height: 35px;margin: 10px 0px;border-radius: 5px;" type="text" [(ngModel)]="label">
            <label style="margin-left: 27px;">标题：</label><input style="border: 1px solid #dddddd;width: 33%;height: 35px;margin: 10px 0px;border-radius: 5px;" type="text" [(ngModel)]="title">
        </div>
        <div style="margin-left: 2%;"><label>描述：</label><input style="border: 1px solid #dddddd;width: 75%;height: 35px;margin: 10px 0px;border-radius: 5px;" type="text" [(ngModel)]="description"></div>
    </div>
    <div class="c-content-inner " [hidden]="!previews">
      <div class="row editorDocument">
        <div class="col-md-12">
          <c-editor [dataEditor]="dataEditor" id="c-editor" (onTextChange)="onTextChange($event)"
                    [HTML5Content]="HTML5Content"
                    [style]="{'height':'60vh'}"></c-editor>
          <br/>
        </div>
      </div>
      <div class="buttons">
        <button class="" (click)="save()">保存</button>
        <button class="" (click)="preview()">预览</button>
        <button class="" (click)="editBack()">返回</button>
      </div>
    </div>
    <div class="preview-layer" [hidden]="previews" style="height: 840px; overflow: auto" (click)="noPreviews()">
      <div class="preview-bg"></div>
      <div class="preview-phone prephone">
        <iframe #iframe class="iframe1"></iframe>
      </div>
    </div>



  `
})

export class Editorh5Component implements OnInit {

  @ViewChild('iframe') iframe: ElementRef;
  @Input() dataEditor: Array<any>;
  @Input() H5Type: Array<any>;
  @Input() isSelectShow: boolean;
  @Input() infoData: Array<any>;
  @Input() HTML5Content: string;

  @Output() onEditBack = new EventEmitter<any>();
  @Output() onPost = new EventEmitter<any>();
  @Output() onSave = new EventEmitter<any>();

  htmlValue: string = '';
  textValue: string = '';
  delta: string = '';
  source: string = '';
  articleContent: string = '';
  previews: boolean = true;
  html5: string = '';
  selectValue: string = '';
  secHtml5;
  ifr_document: any;
  htmlElement: HTMLElement;
  prePhone: boolean = false;
  label: string;
  title: string;
  description: string;

  constructor(private appService: AppService, private toastService: ToastService, private sanitizer: DomSanitizer, @Inject(DOCUMENT) private document: any) {

  }

  ngOnInit() {
    // $('body').delegate('#c-editor', 'mousewheel', function () {
    //   return false;
    // });
    // if(this.dataEditor.length!=1){
      console.log('00000',this.dataEditor);
      this.title=this.dataEditor['title'];
       this.description=this.dataEditor['description'];
       this.label=this.dataEditor['label'];
    // }
    this.appService.titleEventEmitter.emit("富文本编辑器");
    console.log('富文本编辑框传给编辑的数据', this.dataEditor);

  }

  onTextChange(html: UEditorHtml) {
    this.htmlValue = html.htmlValue;
    if(html.htmlValue){
      this.html5=html.htmlValue;
    }
    // this.textValue = html.textValue;
    // this.delta = html.delta;
    // this.source = html.source;
  }


  preview() {
    this.previews = false;
    // this.prePhone=true;
    if (this.htmlValue) {
      this.html5 = this.htmlValue;
    }
    let doc = this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow;
    doc.open();
    doc.write(htmlH + htmlTitle + this.html5 + htmlL);
    doc.close();
  }

  noPreviews() {
    this.previews = true;
  }

  editBack() {
    this.onEditBack.emit(1);
  }

  post() {
    if (!this.selectValue) {
      this.openError('请选择类别！');
    } else {
      this.onPost.emit({
        selectValue: this.selectValue,
      });
    }
  }

  save() {
    this.onSave.emit({
      header: htmlH,
      content: this.html5,
      footer: htmlL,
      title: this.title,
      label: this.label,
      description:this.description
    });
  }

  openError(errorInfo) {
    let toastCfg = new ToastConfig(ToastType.ERROR, '', errorInfo, 3000);
    this.toastService.toast(toastCfg);
  }
}
