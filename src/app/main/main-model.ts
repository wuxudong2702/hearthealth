/**
 * 主数据
 */
export class MainData {
    //用户数据
    userData: UserData;

    //菜单数据
    menuData: Array<MenuData>;

}

/**
 * 用户数据
 */
export class UserData {

    //姓名
    name: string;

    //用户名
    user_name: string;

    //头像
    avator: string;

}

/**
 * 菜单数据
 */
export class MenuData {

    //ID
    id: string;

    //父ID
    parentId: string;

    //名称
    name: string;

    //关键字
    keyWord: string;

    //图标
    icon: string;

    //是否展开
    isExpend?: boolean;

    //URL
    url?: string;

    //子节点
    children?: Array<MenuData>;

}


