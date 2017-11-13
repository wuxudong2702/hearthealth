import {Injectable} from '@angular/core';
import {Http, RequestOptionsArgs} from '@angular/http';
import {SpinService} from '../../shared/spin/spin.service';

import 'rxjs/add/operator/toPromise';
import {HttpClient} from '@angular/common/http';
import {ToastConfig, ToastType} from '../../shared/toast/toast-model';
import {ToastService} from '../../shared/toast/toast.service';


/**
 * http服务
 */
@Injectable()
export class ApiService {
    token: string = '';

    constructor(private http: Http, private spinService: SpinService, private httpClient: HttpClient, private toastService: ToastService,) {
    }


    postLogSort(headersId, order): Promise<any> {
        const url: string = '../../../assets/hearthealthData/log-data/log-data.json';
        return this.httpClient.get(url)
            .toPromise()
            .then(data => data)
            .catch(this.handleError);
    }
    /**
     * 处理请求失败事件
     * @param url
     * @param options
     * @param err
     */
    private requestFailed(err) {
        let msg = '请求发生异常', status = err.status;
        if (status === 0) {
            msg = '请求失败，请求响应出错';
        } else if (status === 404) {
            msg = '请求失败，未找到请求地址';
        } else if (status === 500) {
            msg = '请求失败，服务器出错，请稍后再试';
        } else {
            msg = '未知错误，请检查网络';
        }
        return msg;
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
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
        return Promise.reject( msg || error.message || error );
    }


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
                    }
                    return data;
                }
            )
            .catch(this.handleError);
    }

    getToken(): string {
        return this.token;
    }

    getEcgd(): Promise<any> {
        const url: string = '../../../assets/ecgd.json';
        return this.httpClient.get(url)
            .toPromise()
            .then(data => data)
            .catch(this.handleError);
    }

    getEcgdData(): Promise<any> {
        const url: string = '../../../assets/ecgd-data.json';
        return this.httpClient.get(url, {})
            .toPromise()
            .then(data => data)
            .catch(this.handleError);
    }

    getEcgdDataChart(): Promise<any> {
        const url: string = '../../../assets/ecgd-dataChart.json';
        return this.httpClient.get(url, {})
            .toPromise()
            .then(data => data)
            .catch(this.handleError);
    }

    postEcgdSort(headersId, order): Promise<any> {
        // console.log(headersId,order,'api service Sort');
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

  postAdminRoleSort(headersId,order): Promise<any> {
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

    postAppUserSearch(selectValue,searchValue): Promise<any> {
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

    postAppUserSubSearch(selectValue,searchValue): Promise<any> {
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

    postAppRoleSort(headersId,order): Promise<any> {
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

    postGuideSearch(selectValue,searchValue): Promise<any> {
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

    postMallSearch(selectValue,searchValue): Promise<any> {
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

    postNewsSearch(selectValue,searchValue): Promise<any> {
        const url: string = '../../../assets/hearthealthData/infos-data/infos-news-data.json';
        return this.httpClient.get(url)
            .toPromise()
            .then(data => data)
            .catch(this.handleError);
    }

//dev
    getDevHeader(): Promise<any> {
        const url: string = '../../../assets/hearthealthData/dev-data/dev-headers.json';
        return this.httpClient.get(url)
            .toPromise()
            .then(data => data)
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
    postDevSearch(selectValue,searchValue): Promise<any> {
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

    postHhrSearch(selectValue,searchValue): Promise<any> {
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

    postLogSort(headersId,order): Promise<any> {
        const url: string = '../../../assets/hearthealthData/log-data/log-data.json';
        return this.httpClient.get(url)
            .toPromise()
            .then(data => data)
            .catch(this.handleError);
    }

    postLogSearch(selectValue,searchValue): Promise<any> {
        const url: string = '../../../assets/hearthealthData/log-data/log-data.json';
        return this.httpClient.get(url)
            .toPromise()
            .then(data => data)
            .catch(this.handleError);
    }

}
