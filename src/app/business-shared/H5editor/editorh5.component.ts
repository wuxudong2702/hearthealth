import {Component, Inject, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {AppService} from '../../app.service';
import {DOCUMENT} from '@angular/common';
import {news} from '../../shared/table/table-list.component';
import {ToastService} from '../../shared/toast/toast.service';
import {ToastConfig, ToastType} from '../../shared/toast/toast-model';
import {isNullOrUndefined} from 'util';

export class UEditorHtml {
    htmlValue: string;
    textValue: string;
    delta: string;
    source: string;
}

const htmlH: string = '<!DOCTYPE html>\n' +
    '<html lang="en">\n' +
    '<head>\n' +
    '  <meta charset="UTF-8">\n' +
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">\n' +
    '  <title>Title</title>\n' +
    '</head>\n' +
    '<body>\n' +
    '\n' +
    '<style type="text/css">\n' +
    '  .article-content{font-size: 1.1em;color: #000000;}\n' +
    '  .article-content p{\n' +
    '    word-wrap: break-word;line-height: 1.2em;\n' +
    '  }\n' +
    '  .article-content img {max-width: 100%;border-radius: 4px; }\n' +
    '  .ql-container {\n' +
    '    box-sizing: border-box;\n' +
    '    font-family: Helvetica, Arial, sans-serif;\n' +
    '    font-size: 13px;\n' +
    '    height: 100%;\n' +
    '    margin: 0px;\n' +
    '    position: relative;\n' +
    '  }\n' +
    '  .ql-container.ql-disabled .ql-tooltip {\n' +
    '    visibility: hidden;\n' +
    '  }\n' +
    '  .ql-container.ql-disabled .ql-editor ul[data-checked] > li::before {\n' +
    '    pointer-events: none;\n' +
    '  }\n' +
    '  .ql-clipboard {\n' +
    '    left: -100000px;\n' +
    '    height: 1px;\n' +
    '    overflow-y: hidden;\n' +
    '    position: absolute;\n' +
    '    top: 50%;\n' +
    '  }\n' +
    '  .ql-clipboard p {\n' +
    '    margin: 0;\n' +
    '    padding: 0;\n' +
    '  }\n' +
    '  .ql-editor {\n' +
    '    box-sizing: border-box;\n' +
    '    line-height: 1.42;\n' +
    '    height: 100%;\n' +
    '    outline: none;\n' +
    '    overflow-y: auto;\n' +
    '    padding: 12px 15px;\n' +
    '    tab-size: 4;\n' +
    '    -moz-tab-size: 4;\n' +
    '    text-align: left;\n' +
    '    white-space: pre-wrap;\n' +
    '    word-wrap: break-word;\n' +
    '  }\n' +
    '  .ql-editor > * {\n' +
    '    cursor: text;\n' +
    '  }\n' +
    '  .ql-editor p,\n' +
    '  .ql-editor ol,\n' +
    '  .ql-editor ul,\n' +
    '  .ql-editor pre,\n' +
    '  .ql-editor blockquote,\n' +
    '  .ql-editor h1,\n' +
    '  .ql-editor h2,\n' +
    '  .ql-editor h3,\n' +
    '  .ql-editor h4,\n' +
    '  .ql-editor h5,\n' +
    '  .ql-editor h6 {\n' +
    '    margin: 0;\n' +
    '    padding: 0;\n' +
    '    counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n' +
    '  }\n' +
    '  .ql-editor ol,\n' +
    '  .ql-editor ul {\n' +
    '    padding-left: 1.5em;\n' +
    '  }\n' +
    '  .ql-editor ol > li,\n' +
    '  .ql-editor ul > li {\n' +
    '    list-style-type: none;\n' +
    '  }\n' +
    '  .ql-editor ul > li::before {\n' +
    '    content: \'\\2022\';\n' +
    '  }\n' +
    '  .ql-editor ul[data-checked=true],\n' +
    '  .ql-editor ul[data-checked=false] {\n' +
    '    pointer-events: none;\n' +
    '  }\n' +
    '  .ql-editor ul[data-checked=true] > li *,\n' +
    '  .ql-editor ul[data-checked=false] > li * {\n' +
    '    pointer-events: all;\n' +
    '  }\n' +
    '  .ql-editor ul[data-checked=true] > li::before,\n' +
    '  .ql-editor ul[data-checked=false] > li::before {\n' +
    '    color: #777;\n' +
    '    cursor: pointer;\n' +
    '    pointer-events: all;\n' +
    '  }\n' +
    '  .ql-editor ul[data-checked=true] > li::before {\n' +
    '    content: \'\\2611\';\n' +
    '  }\n' +
    '  .ql-editor ul[data-checked=false] > li::before {\n' +
    '    content: \'\\2610\';\n' +
    '  }\n' +
    '  .ql-editor li::before {\n' +
    '    display: inline-block;\n' +
    '    white-space: nowrap;\n' +
    '    width: 1.2em;\n' +
    '  }\n' +
    '  .ql-editor li:not(.ql-direction-rtl)::before {\n' +
    '    margin-left: -1.5em;\n' +
    '    margin-right: 0.3em;\n' +
    '    text-align: right;\n' +
    '  }\n' +
    '  .ql-editor li.ql-direction-rtl::before {\n' +
    '    margin-left: 0.3em;\n' +
    '    margin-right: -1.5em;\n' +
    '  }\n' +
    '  .ql-editor ol li:not(.ql-direction-rtl),\n' +
    '  .ql-editor ul li:not(.ql-direction-rtl) {\n' +
    '    padding-left: 1.5em;\n' +
    '  }\n' +
    '  .ql-editor ol li.ql-direction-rtl,\n' +
    '  .ql-editor ul li.ql-direction-rtl {\n' +
    '    padding-right: 1.5em;\n' +
    '  }\n' +
    '  .ql-editor ol li {\n' +
    '    counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n' +
    '    counter-increment: list-0;\n' +
    '  }\n' +
    '  .ql-editor ol li:before {\n' +
    '     content: counter(list-0, decimal) \'. \';\n' +
    '   }\n' +
    '  .ql-editor ol li.ql-indent-1 {\n' +
    '    counter-increment: list-1;\n' +
    '  }\n' +
    '  .ql-editor ol li.ql-indent-1:before {\n' +
    '    content: counter(list-1, lower-alpha) \'. \';\n' +
    '  }\n' +
    '  .ql-editor ol li.ql-indent-1 {\n' +
    '    counter-reset: list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n' +
    '  }\n' +
    '  .ql-editor ol li.ql-indent-2 {\n' +
    '    counter-increment: list-2;\n' +
    '  }\n' +
    '  .ql-editor ol li.ql-indent-2:before {\n' +
    '    content: counter(list-2, lower-roman) \'. \';\n' +
    '  }\n' +
    '  .ql-editor ol li.ql-indent-2 {\n' +
    '    counter-reset: list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n' +
    '  }\n' +
    '  .ql-editor ol li.ql-indent-3 {\n' +
    '    counter-increment: list-3;\n' +
    '  }\n' +
    '  .ql-editor ol li.ql-indent-3:before {\n' +
    '    content: counter(list-3, decimal) \'. \';\n' +
    '  }\n' +
    '  .ql-editor ol li.ql-indent-3 {\n' +
    '    counter-reset: list-4 list-5 list-6 list-7 list-8 list-9;\n' +
    '  }\n' +
    '  .ql-editor ol li.ql-indent-4 {\n' +
    '    counter-increment: list-4;\n' +
    '  }\n' +
    '  .ql-editor ol li.ql-indent-4:before {\n' +
    '    content: counter(list-4, lower-alpha) \'. \';\n' +
    '  }\n' +
    '  .ql-editor ol li.ql-indent-4 {\n' +
    '    counter-reset: list-5 list-6 list-7 list-8 list-9;\n' +
    '  }\n' +
    '  .ql-editor ol li.ql-indent-5 {\n' +
    '    counter-increment: list-5;\n' +
    '  }\n' +
    '  .ql-editor ol li.ql-indent-5:before {\n' +
    '    content: counter(list-5, lower-roman) \'. \';\n' +
    '  }\n' +
    '  .ql-editor ol li.ql-indent-5 {\n' +
    '    counter-reset: list-6 list-7 list-8 list-9;\n' +
    '  }\n' +
    '  .ql-editor ol li.ql-indent-6 {\n' +
    '    counter-increment: list-6;\n' +
    '  }\n' +
    '  .ql-editor ol li.ql-indent-6:before {\n' +
    '    content: counter(list-6, decimal) \'. \';\n' +
    '  }\n' +
    '  .ql-editor ol li.ql-indent-6 {\n' +
    '    counter-reset: list-7 list-8 list-9;\n' +
    '  }\n' +
    '  .ql-editor ol li.ql-indent-7 {\n' +
    '    counter-increment: list-7;\n' +
    '  }\n' +
    '  .ql-editor ol li.ql-indent-7:before {\n' +
    '    content: counter(list-7, lower-alpha) \'. \';\n' +
    '  }\n' +
    '  .ql-editor ol li.ql-indent-7 {\n' +
    '    counter-reset: list-8 list-9;\n' +
    '  }\n' +
    '  .ql-editor ol li.ql-indent-8 {\n' +
    '    counter-increment: list-8;\n' +
    '  }\n' +
    '  .ql-editor ol li.ql-indent-8:before {\n' +
    '    content: counter(list-8, lower-roman) \'. \';\n' +
    '  }\n' +
    '  .ql-editor ol li.ql-indent-8 {\n' +
    '    counter-reset: list-9;\n' +
    '  }\n' +
    '  .ql-editor ol li.ql-indent-9 {\n' +
    '    counter-increment: list-9;\n' +
    '  }\n' +
    '  .ql-editor ol li.ql-indent-9:before {\n' +
    '    content: counter(list-9, decimal) \'. \';\n' +
    '  }\n' +
    '  .ql-editor .ql-indent-1:not(.ql-direction-rtl) {\n' +
    '    padding-left: 3em;\n' +
    '  }\n' +
    '  .ql-editor li.ql-indent-1:not(.ql-direction-rtl) {\n' +
    '    padding-left: 4.5em;\n' +
    '  }\n' +
    '  .ql-editor .ql-indent-1.ql-direction-rtl.ql-align-right {\n' +
    '    padding-right: 3em;\n' +
    '  }\n' +
    '  .ql-editor li.ql-indent-1.ql-direction-rtl.ql-align-right {\n' +
    '    padding-right: 4.5em;\n' +
    '  }\n' +
    '  .ql-editor .ql-indent-2:not(.ql-direction-rtl) {\n' +
    '    padding-left: 6em;\n' +
    '  }\n' +
    '  .ql-editor li.ql-indent-2:not(.ql-direction-rtl) {\n' +
    '    padding-left: 7.5em;\n' +
    '  }\n' +
    '  .ql-editor .ql-indent-2.ql-direction-rtl.ql-align-right {\n' +
    '    padding-right: 6em;\n' +
    '  }\n' +
    '  .ql-editor li.ql-indent-2.ql-direction-rtl.ql-align-right {\n' +
    '    padding-right: 7.5em;\n' +
    '  }\n' +
    '  .ql-editor .ql-indent-3:not(.ql-direction-rtl) {\n' +
    '    padding-left: 9em;\n' +
    '  }\n' +
    '  .ql-editor li.ql-indent-3:not(.ql-direction-rtl) {\n' +
    '    padding-left: 10.5em;\n' +
    '  }\n' +
    '  .ql-editor .ql-indent-3.ql-direction-rtl.ql-align-right {\n' +
    '    padding-right: 9em;\n' +
    '  }\n' +
    '  .ql-editor li.ql-indent-3.ql-direction-rtl.ql-align-right {\n' +
    '    padding-right: 10.5em;\n' +
    '  }\n' +
    '  .ql-editor .ql-indent-4:not(.ql-direction-rtl) {\n' +
    '    padding-left: 12em;\n' +
    '  }\n' +
    '  .ql-editor li.ql-indent-4:not(.ql-direction-rtl) {\n' +
    '    padding-left: 13.5em;\n' +
    '  }\n' +
    '  .ql-editor .ql-indent-4.ql-direction-rtl.ql-align-right {\n' +
    '    padding-right: 12em;\n' +
    '  }\n' +
    '  .ql-editor li.ql-indent-4.ql-direction-rtl.ql-align-right {\n' +
    '    padding-right: 13.5em;\n' +
    '  }\n' +
    '  .ql-editor .ql-indent-5:not(.ql-direction-rtl) {\n' +
    '    padding-left: 15em;\n' +
    '  }\n' +
    '  .ql-editor li.ql-indent-5:not(.ql-direction-rtl) {\n' +
    '    padding-left: 16.5em;\n' +
    '  }\n' +
    '  .ql-editor .ql-indent-5.ql-direction-rtl.ql-align-right {\n' +
    '    padding-right: 15em;\n' +
    '  }\n' +
    '  .ql-editor li.ql-indent-5.ql-direction-rtl.ql-align-right {\n' +
    '    padding-right: 16.5em;\n' +
    '  }\n' +
    '  .ql-editor .ql-indent-6:not(.ql-direction-rtl) {\n' +
    '    padding-left: 18em;\n' +
    '  }\n' +
    '  .ql-editor li.ql-indent-6:not(.ql-direction-rtl) {\n' +
    '    padding-left: 19.5em;\n' +
    '  }\n' +
    '  .ql-editor .ql-indent-6.ql-direction-rtl.ql-align-right {\n' +
    '    padding-right: 18em;\n' +
    '  }\n' +
    '  .ql-editor li.ql-indent-6.ql-direction-rtl.ql-align-right {\n' +
    '    padding-right: 19.5em;\n' +
    '  }\n' +
    '  .ql-editor .ql-indent-7:not(.ql-direction-rtl) {\n' +
    '    padding-left: 21em;\n' +
    '  }\n' +
    '  .ql-editor li.ql-indent-7:not(.ql-direction-rtl) {\n' +
    '    padding-left: 22.5em;\n' +
    '  }\n' +
    '  .ql-editor .ql-indent-7.ql-direction-rtl.ql-align-right {\n' +
    '    padding-right: 21em;\n' +
    '  }\n' +
    '  .ql-editor li.ql-indent-7.ql-direction-rtl.ql-align-right {\n' +
    '    padding-right: 22.5em;\n' +
    '  }\n' +
    '  .ql-editor .ql-indent-8:not(.ql-direction-rtl) {\n' +
    '    padding-left: 24em;\n' +
    '  }\n' +
    '  .ql-editor li.ql-indent-8:not(.ql-direction-rtl) {\n' +
    '    padding-left: 25.5em;\n' +
    '  }\n' +
    '  .ql-editor .ql-indent-8.ql-direction-rtl.ql-align-right {\n' +
    '    padding-right: 24em;\n' +
    '  }\n' +
    '  .ql-editor li.ql-indent-8.ql-direction-rtl.ql-align-right {\n' +
    '    padding-right: 25.5em;\n' +
    '  }\n' +
    '  .ql-editor .ql-indent-9:not(.ql-direction-rtl) {\n' +
    '    padding-left: 27em;\n' +
    '  }\n' +
    '  .ql-editor li.ql-indent-9:not(.ql-direction-rtl) {\n' +
    '    padding-left: 28.5em;\n' +
    '  }\n' +
    '  .ql-editor .ql-indent-9.ql-direction-rtl.ql-align-right {\n' +
    '    padding-right: 27em;\n' +
    '  }\n' +
    '  .ql-editor li.ql-indent-9.ql-direction-rtl.ql-align-right {\n' +
    '    padding-right: 28.5em;\n' +
    '  }\n' +
    '  .ql-editor .ql-video {\n' +
    '    display: block;\n' +
    '    max-width: 100%;\n' +
    '  }\n' +
    '  .ql-editor .ql-video.ql-align-center {\n' +
    '    margin: 0 auto;\n' +
    '  }\n' +
    '  .ql-editor .ql-video.ql-align-right {\n' +
    '    margin: 0 0 0 auto;\n' +
    '  }\n' +
    '  .ql-editor .ql-bg-black {\n' +
    '    background-color: #000;\n' +
    '  }\n' +
    '  .ql-editor .ql-bg-red {\n' +
    '    background-color: #e60000;\n' +
    '  }\n' +
    '  .ql-editor .ql-bg-orange {\n' +
    '    background-color: #f90;\n' +
    '  }\n' +
    '  .ql-editor .ql-bg-yellow {\n' +
    '    background-color: #ff0;\n' +
    '  }\n' +
    '  .ql-editor .ql-bg-green {\n' +
    '    background-color: #008a00;\n' +
    '  }\n' +
    '  .ql-editor .ql-bg-blue {\n' +
    '    background-color: #06c;\n' +
    '  }\n' +
    '  .ql-editor .ql-bg-purple {\n' +
    '    background-color: #93f;\n' +
    '  }\n' +
    '  .ql-editor .ql-color-white {\n' +
    '    color: #fff;\n' +
    '  }\n' +
    '  .ql-editor .ql-color-red {\n' +
    '    color: #e60000;\n' +
    '  }\n' +
    '  .ql-editor .ql-color-orange {\n' +
    '    color: #f90;\n' +
    '  }\n' +
    '  .ql-editor .ql-color-yellow {\n' +
    '    color: #ff0;\n' +
    '  }\n' +
    '  .ql-editor .ql-color-green {\n' +
    '    color: #008a00;\n' +
    '  }\n' +
    '  .ql-editor .ql-color-blue {\n' +
    '    color: #06c;\n' +
    '  }\n' +
    '  .ql-editor .ql-color-purple {\n' +
    '    color: #93f;\n' +
    '  }\n' +
    '  .ql-editor .ql-font-serif {\n' +
    '    font-family: Georgia, Times New Roman, serif;\n' +
    '  }\n' +
    '  .ql-editor .ql-font-monospace {\n' +
    '    font-family: Monaco, Courier New, monospace;\n' +
    '  }\n' +
    '  .ql-editor .ql-size-small {\n' +
    '    font-size: 0.75em;\n' +
    '  }\n' +
    '  .ql-editor .ql-size-large {\n' +
    '    font-size: 1.5em;\n' +
    '  }\n' +
    '  .ql-editor .ql-size-huge {\n' +
    '    font-size: 2.5em;\n' +
    '  }\n' +
    '  .ql-editor .ql-direction-rtl {\n' +
    '    direction: rtl;\n' +
    '    text-align: inherit;\n' +
    '  }\n' +
    '  .ql-editor .ql-align-center {\n' +
    '    text-align: center;\n' +
    '  }\n' +
    '  .ql-editor .ql-align-justify {\n' +
    '    text-align: justify;\n' +
    '  }\n' +
    '  .ql-editor .ql-align-right {\n' +
    '    text-align: right;\n}' +
    '  .ql-editor .dom-mark-MarkThisHere {\n' +
    '    float:none;\n}' +
    '  .ql-editor .dom-mark-MarkThisHere img {\n' +
    '    float: left;\n}' +
    '</style>\n' +
    '<div class="article-content ql-editor">';

const htmlL: string = '</div>\n' +
    '\t\n' +
    '</body>\n' +
    '</html>';
// const htmlTitle = "<div class=\"article-title\">\n" +
//   "  <h1 class=\"title\">我是预览页面</h1>\n" +
//   "</div>\n";

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
        <div style="background-color: white">
            <div class="form-group" [hidden]="!previews" style="">
                <div style="margin-left: 2%;">
                    <label>标签：</label>
                    <input
                            style="border: 1px solid #dddddd;width: 25%;height: 35px;margin: 10px 0;border-radius: 5px;" type="text"
                            [(ngModel)]="label">
                    <input type="button" style="border: 1px solid #dddddd;width: 10%;height: 35px;margin: 10px 0;border-radius: 5px;"
                           (click)="generateLabel()" value="生成标签">
                    <label style="margin-left: 5%;">标题：</label><input
                        style="border: 1px solid #dddddd;width: 35%;height: 35px;margin: 10px 0px;border-radius: 5px;" type="text"
                        [(ngModel)]="title">
                </div>
                <div style="margin-left: 2%;"><label>描述：</label><input
                        style="border: 1px solid #dddddd;width: 78%;height: 35px;margin: 10px 0;border-radius: 5px;" type="text"
                        [(ngModel)]="description"></div>
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
            <div class="preview-layer" [hidden]="previews" style="height: 539px; overflow: auto" (click)="noPreviews()">
                <div class="preview-md"></div>
                <div class="preview-phone prephone">
                    <iframe #iframe class="iframe1"></iframe>
                </div>
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
    title: string = '';
    description: string;

    constructor(private appService: AppService, private toastService: ToastService, private sanitizer: DomSanitizer, @Inject(DOCUMENT) private document: any) {

    }

    ngOnInit() {
        // $('body').delegate('#c-editor', 'mousewheel', function () {
        //   return false;
        // });
        // if(this.dataEditor.length!=1){
        // console.log('1001', this.dataEditor, this.HTML5Content);
        this.html5 = this.HTML5Content;
        this.title = this.dataEditor['title'];
        this.description = this.dataEditor['description'];
        this.label = this.dataEditor['label'];
        this.appService.titleEventEmitter.emit('富文本编辑器');
    }

    addserviceView() {

    }

    onTextChange(html: UEditorHtml) {
        // console.log(html.delta,'delta');
        // console.log(html.source,'source');
        this.htmlValue = html.htmlValue;
        if (html.htmlValue) {
            this.html5 = html.htmlValue;
        }
        // this.textValue = html.textValue;
        this.delta = html.delta;
        this.source = html.source;
    }

    formatDate(time: any) {
        const Dates = new Date(time);
        const year: number = Dates.getFullYear();
        const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
        const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
        const hour: any = Dates.getHours();
        const minute: any = Dates.getMinutes();
        const seconds: any = Dates.getSeconds();

        return year + '_' + month + '_' + day + '_' + hour + '_' + minute + '_' + seconds;
    }

    generateLabel() {
        let time = this.formatDate(new Date().getTime());
        this.label = 'label_' + time;
    }

    preview() {
        this.previews = false;
        if (this.htmlValue) {
            this.html5 = this.htmlValue;
        } else {
            this.html5 = this.HTML5Content;
        }

        if (isNullOrUndefined(this.html5)) {
            this.html5 = '';
        }
        let doc = this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow;
        doc.open();
        doc.write(htmlH + this.html5 + htmlL);
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
        if (isNullOrUndefined(this.title)) {
            const toastCfg = new ToastConfig(ToastType.ERROR, '', '请输入标题！', 3000);
            this.toastService.toast(toastCfg);
            return;
        }
        if (isNullOrUndefined(this.label)) {
            const toastCfg = new ToastConfig(ToastType.ERROR, '', '请输入标签！', 3000);
            this.toastService.toast(toastCfg);
            return;
        }
        if (!this.label.match(/^[A-Za-z0-9_\-]{1,50}$/)) {
            const toastCfg = new ToastConfig(ToastType.ERROR, '', '标签必须是英文字母,最多50位！', 3000);
            this.toastService.toast(toastCfg);
            return;
        }
        this.onSave.emit({
            header: htmlH,
            content: this.html5,
            footer: htmlL,
            title: this.title,
            label: this.label,
            description: this.description
        });
    }

    openError(errorInfo) {
        let toastCfg = new ToastConfig(ToastType.ERROR, '', errorInfo, 3000);
        this.toastService.toast(toastCfg);
    }
}
