import { nanoid } from "nanoid";
import Assistant from "./model/Assistant";
import Enchantress from "./model/Enchantress";
import FemaleCleric from "./model/FemaleCleric";
import MaleCleric from "./model/MaleCleric";
import Muse from "./model/Muse";
const STORE_KEY = "DNF_HELPER_ROLES";

let makeTemplateValue = [0, 244, 576, 1088, 2314, 3585, 4853];

/**
 * 添加角色
 *
 * @param {object} params
 */
export const addRole = params => {
    let roleList = JSON.parse(localStorage.getItem(STORE_KEY)) || [];
    params.id = nanoid(6);
    // 设置初始化属性 神界雾神妮版本 红10天花板 智力奶8472 缪斯8463 奶爸8214 依次类推 红11 +244 红12 +576
    if (params.roleType == 1601) {
        params.registerAttribute = 8463 + makeTemplateValue[params.makeTemplate - 10];
        params.streetAttribute = params.registerAttribute;
        roleList.push(new Muse(params));
    } else if (params.roleType == 401) {
        params.registerAttribute = 8214 + makeTemplateValue[params.makeTemplate - 10];
        params.streetAttribute = params.registerAttribute;
        roleList.push(new MaleCleric(params));
    } else if (params.roleType == 1401) {
        params.registerAttribute = 8472 + makeTemplateValue[params.makeTemplate - 10];
        params.streetAttribute = params.registerAttribute;
        roleList.push(new FemaleCleric(params));
    } else {
        params.registerAttribute = 8472 + makeTemplateValue[params.makeTemplate - 10];
        params.streetAttribute = params.registerAttribute;
        roleList.push(new Enchantress(params));
    }
    localStorage.setItem(STORE_KEY, JSON.stringify(roleList));
};

/**
 * 更新角色
 *
 * @param {object} params
 */
export const updateRole = params => {
    let roleList = JSON.parse(localStorage.getItem(STORE_KEY)) || [];
    let result = [];
    roleList.forEach(item => {
        if (item.id == params.id) {
            result.push({ ...item, ...params });
        } else {
            result.push(item);
        }
    });
    localStorage.setItem(STORE_KEY, JSON.stringify(result));
};

/**
 * 删除角色
 *
 * @param {string} id
 */
export const removeRole = id => {
    let roleList = JSON.parse(localStorage.getItem(STORE_KEY)) || [];
    roleList = roleList.filter(item => item.id != id);
    localStorage.setItem(STORE_KEY, JSON.stringify(roleList));
};

/**
 * 获取角色列表 并封装成对象
 *
 * @returns {Assistant[]} 角色列表
 */
export const getRoleList = () => {
    let roleList = JSON.parse(localStorage.getItem(STORE_KEY)) || [];
    let data = [];
    roleList.forEach(item => {
        if (item.roleType == 1601) {
            data.push(new Muse(item));
        } else if (item.roleType == 401) {
            data.push(new MaleCleric(item));
        } else if (item.roleType == 1401) {
            data.push(new FemaleCleric(item));
        } else {
            data.push(new Enchantress(item));
        }
    });
    return data;
};
