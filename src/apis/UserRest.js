import { $http } from '../modules/index';

const prefix = '/product/user';

class UserRest {
    static createUser(params) {
        return $http.post(`${prefix}`, params);
    }

    static selectUserExist(params) {
        return $http.get(`${prefix}/selectUserExist`, {params});
    }
}

export default UserRest;
