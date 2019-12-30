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
}

export default DiaryRest;
