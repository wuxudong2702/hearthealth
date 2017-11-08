import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

//第三方
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

//自定义
import {EditorModule} from '../../shared/editor/editor.module'; //富文本

// import { EditorDemoComponent } from '../../business-shared/H5editor/editor-demo.component';
import {Editorh5Component} from './editorh5.component';


@NgModule({
  imports: [
    NgbModule,
    EditorModule,
    CommonModule,
    FormsModule,
  ],
  declarations: [
    Editorh5Component,
  ],
  exports: [Editorh5Component],
  providers: []
})
export class Editorh5Module {
}
