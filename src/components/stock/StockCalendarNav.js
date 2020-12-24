import React, {Component} from 'react';
import PropTypes from 'prop-types';

class StockCalendarNav extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onPreBtnClick = () => {
        const {onPreviousClick} = this.props;
        onPreviousClick();
    }

    onNextBtnClick = () => {
        const {onNextClick} = this.props;
        onNextClick();
    }

    render() {
        const {className} = this.props;
        return (
            <React.Fragment>
                <div className={className}>
                    <span style={{float: 'left', fontSize: '30px'}} className="material-icons"  onClick={() => this.onPreBtnClick()} >keyboard_arrow_left</span>
                    <span style={{float: 'right', fontSize: '30px'}} className="material-icons"  onClick={() => this.onNextBtnClick()} >keyboard_arrow_right</span>
                </div>
            </React.Fragment>
        );
    }
}

StockCalendarNav.propTypes = {
    stockMonth: PropTypes.string,
    nextMonth: PropTypes.string,
    previousMonth: PropTypes.string,
    onPreviousClick: PropTypes.func,
    onNextClick: PropTypes.func,
    className: PropTypes.object,
};

export default StockCalendarNav;

