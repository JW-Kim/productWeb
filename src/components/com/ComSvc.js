import React from 'react';
import ReactDOM from 'react-dom';
import Confirm from '../com/Confirm';

function confirm(msg) {
    const wrapper = document.body.appendChild(document.createElement('div'));
    const component = ReactDOM.render(<Confirm msg={msg}/>, wrapper);
    const cleanup = () => {
        ReactDOM.unmountComponentAtNode(wrapper);
        return wrapper.remove();
    };

    return component.promise.always(cleanup).promise();
}

export {confirm};
