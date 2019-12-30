import { $http } from '../modules/index';

const prefix = '/product/file/download';

class DownloadRest {
    static downloadPhoto(fileId) {
        return $http.get(`${prefix}?fileId=${fileId}`, {responseType: 'arraybuffer'});
    }
}

export default DownloadRest;
