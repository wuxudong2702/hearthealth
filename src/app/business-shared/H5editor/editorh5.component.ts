import {Component, Inject, OnInit, ViewChild, ElementRef,Input,Output,EventEmitter} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {AppService} from '../../app.service';
import {DOCUMENT} from '@angular/common';
import {news} from '../../shared/table/table-list.component';

export class UEditorHtml {
  htmlValue: string;
  textValue: string;
  delta: string;
  source: string;
}

const htmlH: string ="<!DOCTYPE html>\n" +
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
  "  .article-content img {max-width: 30%;display: block;margin: 0 auto;border-radius: 4px; float:right;}\n" +
  "</style>\n" +
  "<div class=\"article-title\">\n" +
  "  <h1 class=\"title\">我是预览页面</h1>\n" +
  "</div>\n" +
  "<div class=\"article-content\">";

const htmlL: string = "</div>\n" +
  "\t\n" +
  "</body>\n" +
  "</html>";

@Component({
  selector: 'c-editor-h5',
  styleUrls: ['./editorh5.component.css'],
  template: `      

    <select class="form-control col-md-4" [(ngModel)]="selectValue" [hidden]="!isSelectShow">
        <option value="" style="display:none">请选择</option>
        <option *ngFor="let type of H5Type" >{{type.value}}</option>
    </select>
    <div class="c-content-inner " [hidden]="!previews">
      <div class="row editorDocument">
        <div class="col-md-12" >
          <c-editor [dataEditor]="dataEditor" (onTextChange)="onTextChange($event)" [style]="{'height':'60vh'}"></c-editor>
          <br/>
        </div>
      </div>
      <div class="buttons">
        <button class="">发表</button>
        <button class="">保存</button>
        <button class=""(click)="preview()">预览</button>
        <button class=""(click)="editBack()">返回</button>
      </div>
    </div>
    <div style="height: 840px; overflow: auto">
      <div class="preview-layer" [hidden]="previews" (click)="noPreviews()">
        <div class="preview-bg"></div>
        <div class="preview-phone prephone"  >
          <iframe #iframe class="iframe1" ></iframe>
        </div>
      </div>
    </div>



  `
})


export class Editorh5Component implements OnInit {
  @ViewChild('iframe') iframe: ElementRef;
  @Input() dataEditor:news;
  @Input() H5Type:Array<any>;
  @Input() isSelectShow:boolean;

  @Output() onEditBack = new EventEmitter<any>();

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
  prePhone:boolean=false;
  constructor(private appService: AppService, private sanitizer: DomSanitizer, @Inject(DOCUMENT) private document: any) {

  }

  ngOnInit() {
    this.appService.titleEventEmitter.emit("富文本编辑器");
    console.log('富文本编辑框传给编辑的数据',this.dataEditor);

  }

  onTextChange(html: UEditorHtml) {
    this.htmlValue = html.htmlValue;
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
    doc.write(htmlH + this.html5 + htmlL);
    doc.close();
  }

  noPreviews(){
    this.previews = true;
  }
  editBack(){
    this.onEditBack.emit(1);
  }
}
