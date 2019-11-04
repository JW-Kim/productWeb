import { $http } from '../modules/index';

const prefix = '/product/note';

class NoteRest {
    static getNote() {
        return $http.get(`${prefix}`);
    }
}

export default NoteRest;
