import { $http } from '../modules/index';

const prefix = '/product/stock';

class StockRest {
    static selectStockList(params) {
        return $http.get(`${prefix}`, {params});
    }
}

export default StockRest;
