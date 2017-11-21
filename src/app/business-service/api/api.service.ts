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

  getData(url: string = '/api/admin/heart/index', count: string = '8', find_key: string = null, find_val: string = null, sort_key: string = null, sort_val: string = null): Promise<any> {
    console.log(url, count, find_key, find_val, '');
    return this.httpClient.post(url, {
      token: this.sessionStorageService.get('token'),
      count: count,
      find_key: find_key,
      find_val: find_val,
      sort_key: sort_key,
      sort_val: sort_val,
    })
      .toPromise()
      .then(data => {
        console.log(data, 'getData全局获取data');
        return data
      })
      .catch(err => {
        this.handleError(err);
      });
  }

    /*
     设置个人信息
    */
    postAvatar(avator:string): Promise<any> {
        const url: string = '/api/admin/auth/update';
        return this.httpClient.post(url, {
            token: this.sessionStorageService.get('token'),
            avator: avator
        })
            .toPromise()
            .then(data => data)
            .catch(this.handleError);
    }

  getEcgdDataChart(chartId: number): Promise<any> {
    const url: string = ' /api/admin/heart/data';
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

  unbind(dev_id: string) {
    const url: string = '/api/admin/dev/unbind';
    return this.httpClient.post(url, {
      token: this.sessionStorageService.get('token'),
      dev_id: dev_id
    })
      .toPromise()
      .then(data => data)
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

  uploadHtml5Page(title: string, description: string, label: string, header: string, content: string, footer: string): Promise<any> {
    const url: string = "api/admin/info/add";
    return this.httpClient.post(url, {
      token: this.sessionStorageService.get('token'),
      title: title,
      label: label,
      header: header,
      content: content,
      footer: footer,
      description: description,
    })
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }
  upDataHtml5Page(info_id:string,title:string,description:string,label:string,header:string,content:string,footer:string){
    const url: string = "api/admin/info/update";
    return this.httpClient.post(url, {
      token: this.sessionStorageService.get('token'),
      title: title,
      label: label,
      header: header,
      content: content,
      footer: footer,
      description: description,
      info_id:info_id
    })
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  infoContent(info_id: string): Promise<any> {
    const url: string = "api/admin/info/content";
    return this.httpClient.post(url, {
      token: this.sessionStorageService.get('token'),
      info_id: info_id
    })
      .toPromise()
      .then(data => {

        console.log(info_id,data,'6567890-9876567890-=');
        return data
      })
      .catch(this.handleError);
  }
  infoDel(info_id: string = null) {
    const url: string = "api/admin/info/del";
    return this.httpClient.post(url, {
      token: this.sessionStorageService.get('token'),
      info_id: info_id
    })
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  upgradeAdd(ver:string=null,desc:string=null,url:string=null){
    const urls: string = "api/admin/upgrade/add";
    return this.httpClient.post(urls, {
      token: this.sessionStorageService.get('token'),
      ver:ver,
      desc:desc,
      url:url
    })
      .toPromise()
      .then(data => {
        return data;
      })
      .catch(this.handleError);
  }
  upgradeUpdate(id:string,ver:string=null,desc:string=null,url:string=null){
    const urls: string = "api/admin/upgrade/add";
    return this.httpClient.post(urls, {
      token: this.sessionStorageService.get('token'),
      id:id,
      ver:ver,
      desc:desc,
      url:url
    })
      .toPromise()
      .then(data => {
        console.log(data,'======');
        return data;
      })
      .catch(this.handleError);
  }
  // uploadHtml5Page(title:string, description:string, label:string, content: string): void {
  //   const uri:string = "api/admin/info/add";
  //   let form, inputToken, inputTitle, inputDesc, inputLabel, inputContent;
  //
  //   form = document.createElement("form");
  //
  //   form.method = "post";
  //   form.action = uri;
  //
  //   inputToken= document.createElement("input");
  //   inputTitle = document.createElement("input");
  //   inputDesc = document.createElement("input");
  //   inputLabel = document.createElement("input");
  //   inputContent = document.createElement("input");
  //
  //   console.log(this.sessionStorageService.get('token'));
  //
  //
  //   inputToken.setAttribute("name", "token");
  //   inputToken.setAttribute("value", this.sessionStorageService.get('token'));
  //
  //   inputTitle.setAttribute("name", "title");
  //   inputTitle.setAttribute("value", title);
  //
  //   inputDesc.setAttribute("name", "description");
  //   inputDesc.setAttribute("value", description);
  //
  //   inputLabel.setAttribute("name", "label");
  //   inputLabel.setAttribute("value", label);
  //
  //
  //
  //   inputContent.setAttribute("name", "content");
  //   inputContent.setAttribute("value", content);
  //
  //   form.appendChild(inputToken);
  //   form.appendChild(inputTitle);
  //   form.appendChild(inputDesc);
  //   form.appendChild(inputLabel);
  //   form.appendChild(inputContent);
  //
  //   document.body.appendChild(form);
  //
  //   form.submit();
  // }


  getZtreeNodes(): Promise<any> {
    const url: string = '../../../assets/hearthealthData/admin-auth-data/admin-role-ztreeNodes.json';
    return this.httpClient.get(url)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

    adminsAdd(role_id:string,user_name:string,name:string,password:string){
        const urls: string = "/api/admin/admins/add";
        return this.httpClient.post(urls, {
            token: this.sessionStorageService.get('token'),
            role_id: role_id,
            user_name:user_name,
            name:name,
            password:password
        })
            .toPromise()
            .then(data => {
                return data;
            })
            .catch(this.handleError);
    }

    adminsUpdate(id:string,role_id:string,user_name:string,name:string,password:string){
        const urls: string = "/api/admin/admins/update";
        return this.httpClient.post(urls, {
            token: this.sessionStorageService.get('token'),
            id:id,
            role_id: role_id,
            user_name:user_name,
            name:name,
            password:password
        })
            .toPromise()
            .then(data => {
                return data;
            })
            .catch(this.handleError);
    }
    rolesUpdate(id:string,description:string, name:string, perms:string){
        const urls: string = "/api/admin/admins/role/update";
        return this.httpClient.post(urls, {
            token: this.sessionStorageService.get('token'),
            id:id,
            description:description,
            name:name,
            perms:perms
        })
            .toPromise()
            .then(data => {
                return data;
            })
            .catch(this.handleError);
    }
    rolesPerms(id:string){
        const urls: string = "/api/admin/admins/role/perms";
        return this.httpClient.post(urls, {
            token: this.sessionStorageService.get('token'),
            id:id,
        })
            .toPromise()
            .then(data => {
                return data;
            })
            .catch(this.handleError);
    }

    adminsDel(id:string){
        const urls: string = "/api/admin/admins/del";
        return this.httpClient.post(urls, {
            token: this.sessionStorageService.get('token'),
            id:id
        })
            .toPromise()
            .then(data => {
                return data;
            })
            .catch(this.handleError);
    }

    adminsRemind(key:string){
        const urls: string = "/api/admin/admins/role/remind";
        return this.httpClient.post(urls, {
            token: this.sessionStorageService.get('token'),
            key:key
        })
            .toPromise()
            .then(data => {
                return data;
            })
            .catch(this.handleError);
    }

//admin-user
    rolesAdd(name:string,description:string,perms:string){
        const urls: string = "/api/admin/admins/role/add";
        return this.httpClient.post(urls, {
            token: this.sessionStorageService.get('token'),
            name:name,
            description:description,
            perms:perms
        })
            .toPromise()
            .then(data => {
                return data;
            })
            .catch(this.handleError);
    }
    rolesDel(id:string){
        const urls: string = "/api/admin/admins/role/del";
        return this.httpClient.post(urls, {
            token: this.sessionStorageService.get('token'),
            id:id
        })
            .toPromise()
            .then(data => {
                return data;
            })
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

  postAppRoleSubmit(id:string,users_count:number){
        const urls: string = "/api/admin/app/role/update";
        return this.httpClient.post(urls, {
            token: this.sessionStorageService.get('token'),
            id:id,
            users_count:users_count
        })
            .toPromise()
            .then(data => {
                console.log(data,'======');
                return data;
            })
            .catch(this.handleError);
    }

//packages

    packagesDel(packages_id:string=null){
    console.log(packages_id,'[][][][' +
      ']');
        const url: string = '/api/admin/upgrade/del';
        return this.httpClient.post(url, {
            token: this.sessionStorageService.get('token'),
            id: packages_id
        })
            .toPromise()
            .then(data => data)
            .catch(this.handleError);
    }

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

  getHhrDataChart(chartId: number, start_time: any, end_time: any, field: string): Promise<any> {
    const url: string = '/api/admin/report/series';
    return this.httpClient.post(url, {
      token: this.sessionStorageService.get('token'),
      user_id: chartId,
      start_time: start_time,
      end_time: end_time,
      field: field
    })
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  getHhrDataDetails(chartId: number, id: number): Promise<any> {
    const url: string = '/api/admin/report/detail';
    return this.httpClient.post(url, {
      token: this.sessionStorageService.get('token'),
      user_id: chartId,
      heart_data_id: id
    })
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  delHhrDataDetails(id: number, chartId: number): Promise<any> {
    const url: string = '/api/admin/report/del';
    return this.httpClient.post(url, {
      token: this.sessionStorageService.get('token'),
      user_id: id,
      heart_data_id: chartId
    })
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

    homeData(): Promise<any> {
        const url: string = '/api/admin/statistics/data';
        return this.httpClient.post(url, {
            token: this.sessionStorageService.get('token'),
        })
            .toPromise()
            .then(data => data)
            .catch(this.handleError);
    }

}
