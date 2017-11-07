import {Component, Inject, OnInit, ViewChild, ElementRef} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {AppService} from '../../app.service';
import {DOCUMENT} from '@angular/common';

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

  "<div class=\"article-title\">\n" +
  "  <h1 class=\"title\">我是预览页面</h1>\n" +
  "</div>\n" +
  "<div class=\"article-content\">";

const htmlL: string = "</div>\n" +
  "\t\n" +
  "</body>\n" +
  "</html>";

@Component({
  selector: 'c-editor-demo',
  styleUrls: ['./editor-demo.component.css', './editor-demo.component1.css'],
  template: `
    <div class="c-content-inner " [hidden]="!previews">
      <div class="row editorDocument">
        <div class="col-md-12">
          <c-editor [(ngModel)]="text" (onTextChange)="onTextChange($event)" [style]="{'height':'400px'}"></c-editor>
          <br/>
        </div>
      </div>
      <div class=" buttons">
        <button class="">发表</button>
        <button class="">保存</button>
        <button class=""(click)="preview()">预览</button>
      </div>
    </div>
    <div class="preview-layer" [hidden]="previews" (click)="noPreviews()">
      <div class="preview-bg"></div>
      <div class="preview-phone prephone"  >
        <iframe #iframe class="iframe1" ></iframe>
      </div>
    </div>


  `
})


export class EditorDemoComponent implements OnInit {
  @ViewChild('iframe') iframe: ElementRef;

  text: string = '这里面是内容..';
  htmlValue: string = '';
  textValue: string = '';
  delta: string = '';
  source: string = '';
  articleContent: string = '';
  previews: boolean = true;
  html5: string = '';
  secHtml5;
  ifr_document: any;
  htmlElement: HTMLElement;
  prePhone:boolean=false;
  constructor(private appService: AppService, private sanitizer: DomSanitizer, @Inject(DOCUMENT) private document: any) {

    this.appService.titleEventEmitter.emit("富文本编辑器");
  }

  ngOnInit() {
  }

  onTextChange(html: UEditorHtml) {
    console.log(html.htmlValue, '8888');
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

}
