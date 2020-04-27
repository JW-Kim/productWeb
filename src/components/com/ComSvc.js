import React from 'react';
import ReactDOM from 'react-dom';
import Confirm from '../com/Confirm';
import ToastModal from '../com/ToastModal';

function confirm(msg) {
    const wrapper = document.body.appendChild(document.createElement('div'));
    const component = ReactDOM.render(<Confirm msg={msg}/>, wrapper);
    const cleanup = () => {
        ReactDOM.unmountComponentAtNode(wrapper);
        return wrapper.remove();
    };

    return component.promise.always(cleanup).promise();
}

function toast(msg) {
    const wrapper = document.body.appendChild(document.createElement('div'));
    const component = ReactDOM.render(<ToastModal msg={msg}/>, wrapper);
    const cleanup = () => {
        ReactDOM.unmountComponentAtNode(wrapper);
        return wrapper.remove();
    };

    return component.promise.always(cleanup).promise();
}

function getTodayDt() {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    return `${yyyy}.${mm}.${dd}`;
}

function getDt(date) {
    const dt = new Date(date);
    const year = dt.getFullYear();
    let month = dt.getMonth();
    let day = dt.getDate();
    month = `${month + 1}`;
    day = `${day + 0}`;

    if(month.length === 1) {
        month = `0${month}`;
    }
    if(day.length === 1) {
        day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
}

export {
    confirm,
    getTodayDt,
    getDt,
    toast
};
