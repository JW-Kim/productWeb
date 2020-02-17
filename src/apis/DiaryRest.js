import { $http } from '../modules/index';

const prefix = '/product/diary';

class DiaryRest {
    static getMonthDiary(params) {
        return $http.get(`${prefix}/month`, {params});
    }

    static getMonthDisease(params) {
        return $http.get(`${prefix}/diseaseMonth`, {params});
    }

    static getDiary(diaryId) {
        return $http.get(`${prefix}/${diaryId}`);
    }

    static getDisease(diseaseId) {
        return $http.get(`${prefix}/disease/${diseaseId}`);
    }

    static createDiary(params) {
        return $http.post(`${prefix}`, params);
    }
}

export default DiaryRest;
