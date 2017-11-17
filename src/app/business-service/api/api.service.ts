import {Injectable} from '@angular/core';
import {Http, RequestOptionsArgs} from '@angular/http';
import {SpinService} from '../../shared/spin/spin.service';

import 'rxjs/add/operator/toPromise';
import {HttpClient} from '@angular/common/http';
import {ToastConfig, ToastType} from '../../shared/toast/toast-model';
import {ToastService} from '../../shared/toast/toast.service';
import {SessionStorageService} from '../../shared/storage/session-storage.service';
import {promise} from "selenium-webdriver";


/**
 * http服务
 */
@Injectable()
export class ApiService {

  token: string = '';

  perms: Array<string>;

  headers: any;

  headerConfig: any;

  constructor(private http: Http, private spinService: SpinService, private httpClient: HttpClient, private toastService: ToastService, private sessionStorageService: SessionStorageService) {
    console.log('api service');
    this.getHeaders();
    let perm = this.sessionStorageService.getObject('perm');
    let headerConfig = this.sessionStorageService.getObject('headerConfig');
    let headers = this.sessionStorageService.getObject('headers');

    if (perm && headerConfig && headers) {
      this.perms = perm;
      this.headerConfig = headerConfig;
      this.headers = headers;
    }
  }

  postLogSort(headersId, order): Promise<any> {
    const url: string = '../../../assets/hearthealthData/log-data/log-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    let msg = '请求发生异常', status = error.status;
    if (status === 0) {
      msg = '请求失败，请求响应出错';
    } else if (status === 404) {
      msg = '请求失败，未找到请求地址';
    } else if (status === 500) {
      msg = '请求失败，服务器出错，请稍后再试';
    } else {
      msg = '未知错误，请检查网络';
    }
    return Promise.reject(msg || error.message || error);
  }

  /*
  登录
   */
  login(userName: string, password: string): Promise<any> {
    const url: string = '/api/admin/auth/login';
    return this.httpClient.post(url, {
      name: userName,
      password: password
    })
      .toPromise()
      .then(data => {
          if (data['status'] == 'ok') {
            this.token = data['data']['token'];
            this.sessionStorageService.set('token', this.token);
            this.getPerm();
            this.getHeaderConfig();
          }
          return data;
        }
      )
      .catch(this.handleError);
  }

  logout() {
    const url: string = '/api/admin/auth/logout';
    return this.httpClient.post(url, {
      token: this.sessionStorageService.get('token')
    })
      .toPromise()
      .then(data => {
        this.sessionStorageService.remove('perm');
        this.sessionStorageService.remove('headerConfig');
        this.sessionStorageService.remove('headers');
        this.sessionStorageService.remove('token');
        this.sessionStorageService.remove('menu');
        // conso
        return data;
      })
      .catch(this.handleError);
  }

  /*
  获取个人信息
   */
  me(): Promise<any> {
    const url: string = '/api/admin/auth/me';
    return this.httpClient.post(url, {
      token: this.sessionStorageService.get('token')
    })
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  /*
  获取菜单
   */
  getMenu(): Promise<any> {
    const url: string = '/api/admin/menu';
    return this.httpClient.post(url, {
      token: this.sessionStorageService.get('token'),
    }).toPromise()
      .then(data => {
        this.sessionStorageService.setObject('menu', data);
        return data;
      })
      .catch(this.handleError);
  }

  /*
  获取权限
   */
  private getPerm(): Promise<any> {
    const url: string = '/api/admin/perm';
    return this.httpClient.post(url, {
      token: this.sessionStorageService.get('token'),
    }).toPromise()
      .then(data => {
        if (data['status'] == 'ok') {
          this.perms = data['data'];
          this.sessionStorageService.setObject('perm', data);
        } else {
          console.error('获取用户权限错误：', data);
        }
      })
      .catch(err => {
        let msg = this.handleError(err);
        console.error('获取用户权限异常', err);
      });
  }

  private checkPerm(perm: string): Promise<any> {
    return new Promise((fulfill, reject) => {
      try {
        let val = this.perms.some(val => {
          return val == perm;
        });
        fulfill(val);
      } catch (error) {
        reject("获取权限失败");
      }
    });
  }

  isHavePerm(perm: string): Promise<any> {
    if (this.perms) {
      return this.getPerm().then(v => {
        let val = this.perms.some(val => {
          return val == perm;
        });
        return val;
      });
    } else {
      return this.checkPerm(perm);
    }
  }

  private getHeaders(): void {
    const url: string = '../../../assets/headers.json';
    this.httpClient.get(url)
      .toPromise()
      .then(data => {
        this.headers = data;
        this.sessionStorageService.setObject('headers', data);
      })
      .catch(err => {
        let msg = this.handleError(err);
        console.error('获取表头异常', err);
      });
  }

  getHeaderConfig(): Promise<any> {
    const url: string = '/api/admin/header';
    return this.httpClient.post(url, {
      token: this.sessionStorageService.get('token'),
    })
      .toPromise()
      .then(data => {
        return new Promise((fulfill, reject) => {
          if (data['status'] == 'ok') {
            this.headerConfig = data['data'];
            this.sessionStorageService.setObject('headerConfig', this.headerConfig);
            fulfill(true);
          } else {
            reject(false);
          }
        });
      })
      .catch(err => {
        let msg = this.handleError(err);
      });
  }


  //获取users表头
  getHeader(table: string): any {
    let header: any = this.headers[table];
    let config: any = this.headerConfig[table];
    let _header: Array<any> = [];

    _header = header.map(v => {
      let key: string = v['key'];
      if (config && config[key]) {
        v['index'] = config[key]['index'];
        v['show'] = config[key]['show'] == '1';
      }
      return v;
    });
    return _header;
  }

  //设置users表头
  //table为表名
  //set:为如下格式字符串
  // 'userName,true,0;
  // relationship,true,1;
  // accountType,true,2;
  // earliest, true, 3;
  // latest, true,4;
  // historicalTests,true,5;'
  setHeader(table: string, set: string): Promise<any> {
    const url: string = '/api/admin/header/set';
    console.log(set, 'setHeader2');
    return this.httpClient.post(url, {
      token: this.sessionStorageService.get('token'),
      table: table,
      set: set
    })
      .toPromise()
      .then(data => {
        if (data['status'] == 'ok') {
          return this.getHeaderConfig();
        } else {
          console.error('设置表头错误', data['message']);
        }
      })
      .catch(err => {
        let msg = this.handleError(err);
      });
  }


  reset(oldPassword: string, password: string, certainPassword: string): Promise<any> {
    const url: string = '/api/admin/auth/reset';
    return this.httpClient.post(url, {
      token: this.sessionStorageService.get('token'),
      password: oldPassword,
      new_password: password,
      new_password_confirmation: certainPassword
    })
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  getData(url: string = '/api/admin/heart/index', count: string = '8', find_key: string = null, find_val: string = null): Promise<any> {
    console.log(url, count, find_key, find_val, '-=-=-=');
    return this.httpClient.post(url, {
      token: this.sessionStorageService.get('token'),
      count: count,
      find_key: find_key,
      find_val: find_val,
    })
      .toPromise()
      .then(data => data)
      .catch(err => {
        this.handleError(err);
      });
  }

  getEcgdDataChart(chartId: number): Promise<any> {
    const url: string = '/api/admin/heart/data';
    return this.httpClient.post(url, {
      token: this.sessionStorageService.get('token'),
      heart_data_id: chartId
    })
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postEcgdSort(headersId, order): Promise<any> {
    const url: string = '../../../assets/ecgd-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postEcgdSearch(selectValue, searchValue): Promise<any> {
    const url: string = '../../../assets/ecgd-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  ecgdDelData(ids: string): Promise<any> {
    const url: string = '/api/admin/heart/del';
    return this.httpClient.post(url, {
      token: this.sessionStorageService.get('token'),
      heart_data_id: ids
    })
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  ecgdDownloadData(ids: string) {
    console.log(ids);
    const url: string = '/api/admin/heart/download?token=' + this.sessionStorageService.get('token') + "&heart_data_id=" + ids;
    return this.http.get(url)
      .map(res => new Blob([res.text()], {type: 'txt/plain'}))
      .catch(this.handleError);
  }

// admin-role
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

  postAdminRoleDel(id): Promise<any> {
    const url: string = '../../../assets/hearthealthData/admin-auth-data/admin-role-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postAdminRoleDelAll(checkedList): Promise<any> {
    const url: string = '../../../assets/hearthealthData/admin-auth-data/admin-role-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postAdminRoleSort(headersId, order): Promise<any> {
    const url: string = '../../../assets/hearthealthData/admin-auth-data/admin-role-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postAdminRoleSubmit(submitData): Promise<any> {
    const url: string = '../../../assets/hearthealthData/admin-auth-data/admin-role-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

//admin-user
  getAdminUserHeader(): Promise<any> {
    const url: string = '../../../assets/hearthealthData/admin-auth-data/admin-user-headers.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  getAdminUserData(): Promise<any> {
    const url: string = '../../../assets/hearthealthData/admin-auth-data/admin-user-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postAdminUserDel(id): Promise<any> {
    const url: string = '../../../assets/hearthealthData/admin-auth-data/admin-user-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postAdminUserDelAll(checkedList): Promise<any> {
    const url: string = '../../../assets/hearthealthData/admin-auth-data/admin-user-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postAdminUserSort(headersId, order): Promise<any> {
    const url: string = '../../../assets/hearthealthData/admin-auth-data/admin-user-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postAdminUserSubmit(submitData): Promise<any> {
    const url: string = '../../../assets/hearthealthData/admin-auth-data/admin-user-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

//app-user
  getAppUserHeader(): Promise<any> {
    const url: string = '../../../assets/hearthealthData/app-auth-data/app-user-headers.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  getAppUserData(): Promise<any> {
    const url: string = '../../../assets/hearthealthData/app-auth-data/app-user-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  getAppUserSubHeader(): Promise<any> {
    const url: string = '../../../assets/hearthealthData/app-auth-data/app-user-sub-headers.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => {
        console.log(data, '21233243443');
        return data;
      })
      .catch(this.handleError);
  }

  getAppUserSubData(): Promise<any> {
    const url: string = '../../../assets/hearthealthData/app-auth-data/app-user-sub-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postAppUserDel(id): Promise<any> {
    const url: string = '../../../assets/hearthealthData/app-auth-data/app-user-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postAppUserDelAll(checkedList): Promise<any> {
    const url: string = '../../../assets/hearthealthData/app-auth-data/app-user-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postAppUserSort(headersId, order): Promise<any> {
    const url: string = '../../../assets/hearthealthData/app-auth-data/app-user-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postAppUserSubmit(submitData): Promise<any> {
    const url: string = '../../../assets/hearthealthData/app-auth-data/app-user-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postAppUserSearch(selectValue, searchValue): Promise<any> {
    const url: string = '../../../assets/hearthealthData/app-auth-data/app-user-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postAppUserSubDel(id): Promise<any> {
    const url: string = '../../../assets/hearthealthData/app-auth-data/app-user-sub-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postAppUserSubDelAll(checkedList): Promise<any> {
    const url: string = '../../../assets/hearthealthData/app-auth-data/app-user-sub-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postAppUserSubSort(headersId, order): Promise<any> {
    const url: string = '../../../assets/hearthealthData/app-auth-data/app-user-sub-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postAppUserSubSubmit(submitData): Promise<any> {
    const url: string = '../../../assets/hearthealthData/app-auth-data/app-user-sub-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postAppUserSubSearch(selectValue, searchValue): Promise<any> {
    const url: string = '../../../assets/hearthealthData/app-auth-data/app-user-sub-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

//app-role
  getAppRoleHeader(): Promise<any> {
    const url: string = '../../../assets/hearthealthData/app-auth-data/app-role-headers.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  getAppRoleData(): Promise<any> {
    const url: string = '../../../assets/hearthealthData/app-auth-data/app-role-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postAppRoleDel(id): Promise<any> {
    const url: string = '../../../assets/hearthealthData/app-auth-data/app-role-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postAppRoleDelAll(checkedList): Promise<any> {
    const url: string = '../../../assets/hearthealthData/app-auth-data/app-role-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postAppRoleSort(headersId, order): Promise<any> {
    const url: string = '../../../assets/hearthealthData/app-auth-data/app-role-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postAppRoleSubmit(submitData): Promise<any> {
    const url: string = '../../../assets/hearthealthData/app-auth-data/app-role-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

//packages
  getPackagesHeader(): Promise<any> {
    const url: string = '../../../assets/hearthealthData/packages-data/packages-headers.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  getPackagesData(): Promise<any> {
    const url: string = '../../../assets/hearthealthData/packages-data/packages-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postPackagesDel(id): Promise<any> {
    const url: string = '../../../assets/hearthealthData/packages-data/packages-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postPackagesDelAll(checkedList): Promise<any> {
    const url: string = '../../../assets/hearthealthData/packages-data/packages-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postPackagesSort(headersId, order): Promise<any> {
    const url: string = '../../../assets/hearthealthData/packages-data/packages-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postPackagesSubmit(checkedList): Promise<any> {
    const url: string = '../../../assets/hearthealthData/packages-data/packages-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

//infos-guide
  getGuideHeader(): Promise<any> {
    const url: string = '../../../assets/hearthealthData/infos-data/infos-guide-headers.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  getGuideData(): Promise<any> {
    const url: string = '../../../assets/hearthealthData/infos-data/infos-guide-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postGuideDel(id): Promise<any> {
    const url: string = '../../../assets/hearthealthData/infos-data/infos-guide-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postGuideDelAll(checkedList): Promise<any> {
    const url: string = '../../../assets/hearthealthData/infos-data/infos-guide-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postGuideSort(headersId, order): Promise<any> {
    const url: string = '../../../assets/hearthealthData/infos-data/infos-guide-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postGuideSearch(selectValue, searchValue): Promise<any> {
    const url: string = '../../../assets/hearthealthData/infos-data/infos-guide-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

//infos-mall
  getMallHeader(): Promise<any> {
    const url: string = '../../../assets/hearthealthData/infos-data/infos-mall-headers.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  getMallData(): Promise<any> {
    const url: string = '../../../assets/hearthealthData/infos-data/infos-mall-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postMallDel(id): Promise<any> {
    const url: string = '../../../assets/hearthealthData/infos-data/infos-mall-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postMallDelAll(checkedList): Promise<any> {
    const url: string = '../../../assets/hearthealthData/infos-data/infos-mall-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postMallSort(headersId, order): Promise<any> {
    const url: string = '../../../assets/hearthealthData/infos-data/infos-mall-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postMallSearch(selectValue, searchValue): Promise<any> {
    const url: string = '../../../assets/hearthealthData/infos-data/infos-mall-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

//infos-news
  getNewsHeader(): Promise<any> {
    const url: string = '../../../assets/hearthealthData/infos-data/infos-news-headers.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  getNewsData(): Promise<any> {
    const url: string = '../../../assets/hearthealthData/infos-data/infos-news-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => {
        console.log('getNewsData', data);
        return data;
      })
      .catch(this.handleError);
  }

  postNewsDel(id): Promise<any> {
    const url: string = '../../../assets/hearthealthData/infos-data/infos-news-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postNewsDelAll(checkedList): Promise<any> {
    const url: string = '../../../assets/hearthealthData/infos-data/infos-news-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postNewsSort(headersId, order): Promise<any> {
    const url: string = '../../../assets/hearthealthData/infos-data/infos-news-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  //dev
  getDevHeader(): Promise<any> {
    const url: string = '/api/dev/index';
    console.log('get dev header token', this.token);
    return this.httpClient.post(url, {
      token: this.token
    })
      .toPromise()
      .then(data => {
          return data;
        }
      )
      .catch(this.handleError);
  }

  getDevData(): Promise<any> {
    const url: string = '../../../assets/hearthealthData/dev-data/dev-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postDevDel(id): Promise<any> {
    const url: string = '../../../assets/hearthealthData/dev-data/dev-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postDevDelAll(checkedList): Promise<any> {
    const url: string = '../../../assets/hearthealthData/dev-data/dev-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postDevSort(headersId, order): Promise<any> {
    const url: string = '../../../assets/hearthealthData/dev-data/dev-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postDevSubmit(addData): Promise<any> {
    const url: string = '../../../assets/hearthealthData/dev-data/dev-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  //hhr
  postDevSearch(selectValue, searchValue): Promise<any> {
    const url: string = '../../../assets/hearthealthData/dev-data/dev-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  //hhr
  getHhrHeader(): Promise<any> {
    const url: string = '../../../assets/hearthealthData/hhr-data/hhr-headers.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  getHhrData(): Promise<any> {
    const url: string = '../../../assets/hearthealthData/hhr-data/hhr-data.json';
    return this.httpClient.get(url, {})
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  getHhrDataChart(): Promise<any> {
    const url: string = '../../../assets/hearthealthData/hhr-data/hhr-dataChart.json';
    return this.httpClient.get(url, {})
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  getHhrDataDetails(): Promise<any> {
    const url: string = '../../../assets/hearthealthData/hhr-data/hhr-dataDetails.json';
    return this.httpClient.get(url, {})
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postHhrDel(id): Promise<any> {
    const url: string = '../../../assets/hearthealthData/hhr-data/hhr-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postHhrDelAll(checkedList): Promise<any> {
    const url: string = '../../../assets/hearthealthData/hhr-data/hhr-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postHhrSort(headersId, order): Promise<any> {
    const url: string = '../../../assets/hearthealthData/hhr-data/hhr-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postHhrSearch(selectValue, searchValue): Promise<any> {
    const url: string = '../../../assets/hearthealthData/hhr-data/hhr-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

//log
  getLogHeader(): Promise<any> {
    const url: string = '../../../assets/hearthealthData/log-data/log-headers.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  getLogData(): Promise<any> {
    const url: string = '../../../assets/hearthealthData/log-data/log-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postNewsSearch(selectValue, searchValue): Promise<any> {
    const url: string = '../../../assets/hearthealthData/log-data/log-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  postLogSearch(selectValue, searchValue): Promise<any> {
    const url: string = '../../../assets/hearthealthData/log-data/log-data.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  //home
  getHomeDataChart(): Promise<any> {
    const url: string = '../../../assets/hearthealthData/home-data/home-dataChart.json';
    return this.httpClient.get(url, {})
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }


}
