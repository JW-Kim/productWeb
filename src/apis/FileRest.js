import { $http } from '../modules/index';

const prefix = '/product/file';

class FileRest {
    static fileUpload(formData) {
        return $http.post(`${prefix}/upload`, formData, { headers: {'Content-type': 'multipart/form-data'}});
    }
}

export default FileRest;
