import ReactDOM from 'react-dom';

function openPop(element) {
    const wrapper = document.body.appendChild(document.createElement('div'));
    const component = ReactDOM.render(element, wrapper);
    const cleanup = () => {
        ReactDOM.unmountComponentAtNode(wrapper);
        return wrapper.remove();
    };

    return component.promise.always(cleanup).promise();
}

export {openPop};
