import { $http } from '../modules/index';

const prefix = '/product/note';

class NoteRest {
    static getNotes() {
        return $http.get(`${prefix}`);
    }

    static getNoteCfg(params) {
        return $http.get(`${prefix}/cfg`, {params});
    }

    static getNote(noteId) {
        return $http.get(`${prefix}/${noteId}`);
    }
}

export default NoteRest;
