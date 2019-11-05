import * as ActionTypes from '../actions/dialog';

const initialState = {
    toast: {
        toastYn: false,
        toastMsg: ''
    }
};

const note = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_TOAST:
            return Object.assign({}, state, { toast: action.toast });
        default:
            return state;
    }
};

export default note;
