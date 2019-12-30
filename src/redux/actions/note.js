export const SET_NOTE = 'SET_NOTE';
export const SET_NOTES = 'SET_NOTES';
export const SET_DIARY_MONTH = 'SET_DIARY_MONTH';
export const SET_DIARY_DT = 'SET_DIARY_DT';
export const SET_DIARIES = 'SET_DIARIES';
export const SET_DISEASES = 'SET_DISEASES';
export const SET_DIARY = 'SET_DIARY';
export const SET_DISEASE = 'SET_DISEASE';

function setDisease(disease) {
    return {
        type: SET_DISEASE,
        disease
    };
}

function setDiary(diary) {
    return {
        type: SET_DIARY,
        diary
    };
}

function setDiseases(diseases) {
    return {
        type: SET_DISEASES,
        diseases
    };
}

function setDiaries(diaries) {
    return {
        type: SET_DIARIES,
        diaries
    };
}

function setNote(noteId) {
    return {
        type: SET_NOTE,
        noteId
    };
}

function setNotes(notes) {
    return {
        type: SET_NOTES,
        notes
    };
}

function setDiaryMonth(diaryMonth) {
    return {
        type: SET_DIARY_MONTH,
        diaryMonth
    };
}

function setDiaryDt(diaryDt) {
    return {
        type: SET_DIARY_DT,
        diaryDt
    };
}

export {
    setNote,
    setNotes,
    setDiaryMonth,
    setDiaryDt,
    setDiseases,
    setDiaries,
    setDisease,
    setDiary
};
