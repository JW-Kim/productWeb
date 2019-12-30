import * as ActionTypes from '../actions/note';

const initialState = {
    noteId: null,
    notes: [],
    diaryMonth: null,
    diaryDt: null,
    diaries: null,
    diseases: null,
    diary: null,
    disease: null
};

const note = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_NOTE:
            return Object.assign({}, state, { noteId: action.noteId });
        case ActionTypes.SET_NOTES:
            return Object.assign({}, state, { notes: action.notes });
        case ActionTypes.SET_DIARY_MONTH:
            return Object.assign({}, state, { diaryMonth: action.diaryMonth });
        case ActionTypes.SET_DIARY_DT:
            return Object.assign({}, state, { diaryDt: action.diaryDt });
        case ActionTypes.SET_DIARIES:
            return Object.assign({}, state, { diaries: action.diaries });
        case ActionTypes.SET_DISEASES:
            return Object.assign({}, state, { diseases: action.diseases });
        case ActionTypes.SET_DIARY:
            return Object.assign({}, state, { diary: action.diary });
        case ActionTypes.SET_DISEASE:
            return Object.assign({}, state, { disease: action.disease });
        default:
            return state;
    }
};

export default note;
