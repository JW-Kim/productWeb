import { $http } from '../modules/index';

const prefix = '/product/user';

class UserRest {
    static createUser(params) {
        return $http.post(`${prefix}`, params);
    }

    static selectUserExist(params) {
        return $http.get(`${prefix}/selectUserExist`, {params});
    }

    static selectUserList(params) {
        return $http.get(`${prefix}/search`, {params});
    }
}

export default UserRest;
