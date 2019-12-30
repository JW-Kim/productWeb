import axios from 'axios';
import Cookies from 'js-cookie';

const reqInterceptorOnSuccess = config => {
    const configAddedToken = config;
    configAddedToken.headers.Authorization = `Bearer ${Cookies.get('token')}`;
    return configAddedToken;
};

const regInterceptorOnError = () => {};

const resInterceptorOnSuccess = success => {
    return success;
};

const resInterceptorOnError = (error) => {
    const {response} = error;

    if(response.status === 403) {
        Cookies.remove('token');
        console.log(window.location);
        window.location.href = `${window.location.origin}/login`;
    }
    return error;
};

axios.interceptors.request.use(reqInterceptorOnSuccess, regInterceptorOnError);
axios.interceptors.response.use(resInterceptorOnSuccess, resInterceptorOnError);

class $http {
    constructor() {
        throw new Error('Cannot construct singletorn');
    }

    static request(config) {
        return axios.request(config);
    }

    static get(uri, config) {
        return axios.get(uri, config, {
            paramsSerializer: params => {
                return encodeURIComponent(params);
            }
        });
    }

    static post(uri, data, config) {
        return axios.post(uri, data, config);
    }

    static put(uri, data, config) {
        return axios.put(uri, data, config);
    }

    static delete(uri, data, config) {
        return axios.delete(uri, data, config);
    }

    static create(config) {
        const instance = axios.create(config);
        return instance;
    }
}

export { axios as axiosInstance };
export default $http;
