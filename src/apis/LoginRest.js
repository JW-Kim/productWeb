import { $http } from '../modules/index';

const prefix = '/product/login';

class LoginRest {
    static login(id, password) {
        return $http.post(`${prefix}?username=${id}&password=${password}`);
    }
}

export default LoginRest;
