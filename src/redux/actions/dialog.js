export const SET_TOAST = 'SET_TOAST';

export function setToast(toast) {
    return {
        type: SET_TOAST,
        toast
    };
}
