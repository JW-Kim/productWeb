import * as ActionTypes from '../actions/note';

const initialState = {
    notes: []
};

const note = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_NOTES:
            return Object.assign({}, state, { notes: action.notes });
        default:
            return state;
    }
};

export default note;
