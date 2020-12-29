import { $http } from '../modules/index';

const prefix = '/product/stock';

class StockRest {
    static selectStockList(params) {
        return $http.get(`${prefix}`, {params});
    }

    static selectStock(stockId) {
        return $http.get(`${prefix}/${stockId}`);
    }

    static selectCompanyList(params) {
        return $http.get(`${prefix}/company`, {params});
    }

    static insertCompany(params) {
        return $http.post(`${prefix}/company`, params);
    }

    static insertStock(params) {
        return $http.post(`${prefix}`, params);
    }

    static updateStock(params) {
        return $http.post(`${prefix}/update`, params);
    }

    static deleteStock(stockId) {
        return $http.post(`${prefix}/delete/${stockId}`);
    }
}

export default StockRest;
