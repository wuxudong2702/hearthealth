import {Injectable} from '@angular/core';
import {Http, RequestOptionsArgs } from '@angular/http';
import {SpinService} from '../../shared/spin/spin.service';
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/toPromise';

/**
 * http服务
 */
@Injectable()
export class ApiService {

  constructor(private http: Http, private spinService: SpinService, private httpClient: HttpClient) {
  }

  /**
   * 处理请求失败事件
   * @param url
   * @param options
   * @param err
   */
  private requestFailed(url: string, options: RequestOptionsArgs, err) {
    let msg = '请求发生异常', status = err.status;
    if (status === 0) {
      msg = '请求失败，请求响应出错';
    } else if (status === 404) {
      msg = '请求失败，未找到请求地址';
    } else if (status === 500) {
      msg = '请求失败，服务器出错，请稍后再试';
    } else {
      msg = "未知错误，请检查网络";
    }

    return msg;

  }

  getEcgd(): Promise<any> {
    const url: string = '../../../assets/ecgd.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }
  getAdminRoleHeader(): Promise<any> {
    const url: string = '../../../assets/hearthealthData/admin-auth-data/admin-role-headers.json';
    return this.httpClient.get(url)
        .toPromise()
        .then(data => data)
        .catch(this.handleError);
  }
  getAdminRoleData(): Promise<any> {
      const url: string = '../../../assets/hearthealthData/admin-auth-data/admin-role-data.json';
      return this.httpClient.get(url)
        .toPromise()
        .then(data => data)
        .catch(this.handleError);
  }
  getZtreeNodes(): Promise<any> {
      const url: string = '../../../assets/hearthealthData/admin-auth-data/admin-role-ztreeNodes.json';
      return this.httpClient.get(url)
          .toPromise()
          .then(data => data)
          .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
