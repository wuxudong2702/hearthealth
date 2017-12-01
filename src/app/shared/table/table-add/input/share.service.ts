import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ShareService {

    private Source=new Subject<any>();
    Val$=this.Source.asObservable();
    formValMission(message: any) {
        this.Source.next(message);
    }
}