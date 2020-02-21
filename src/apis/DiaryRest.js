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

    static updateDiary(diaryId, params) {
        return $http.post(`${prefix}/${diaryId}`, params);
    }

    static deleteDiary(diaryId) {
        return $http.delete(`${prefix}/${diaryId}`);
    }

    static updateDisease(diseaseId, params) {
        return $http.post(`${prefix}/disease/${diseaseId}`, params);
    }

    static insertDisease(params) {
        return $http.post(`${prefix}/disease`, params);
    }

    static deleteDisease(diseaseId) {
        return $http.delete(`${prefix}/disease/${diseaseId}`);
    }
}

export default DiaryRest;
