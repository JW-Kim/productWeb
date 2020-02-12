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

    static getNoteShareUserList(noteId) {
        return $http.get(`${prefix}/${noteId}/share/user`);
    }

    static insertNoteShareUser(noteId, params) {
        return $http.post(`${prefix}/${noteId}/share/user`, params);
    }

    static deleteNoteShareUser(noteId, userId) {
        return $http.delete(`${prefix}/${noteId}/share/user?userId=${userId}`);
    }

    static insertNote(params) {
        return $http.post(`${prefix}`, params);
    }

    static updateNote(noteId, params) {
        return $http.post(`${prefix}/${noteId}`, params);
    }
}

export default NoteRest;
