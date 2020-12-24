import React, {Component} from 'react';
import PropTypes from 'prop-types';

class StockCalendarDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cellStyle: {
                height: `${(window.innerWidth / 8)}px`,
                width: `${(window.innerWidth / 8)}px`,
            },
            dateStyle: {
                position: 'relative',
                top: `${((window.innerWidth / 8) - 27) / 2}px`
            },
            dotStyle: {
                position: 'relative',
                top: `${((window.innerWidth / 8) / 2) - 27}px`
            }
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.addEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        this.setState({
            cellStyle: {
                height: `${(window.innerWidth / 8)}px`,
                width: `${(window.innerWidth / 8)}px`,
            },
            dateStyle: {
                position: 'relative',
                top: `${((window.innerWidth / 8) - 27) / 2}px`
            },
            dotStyle: {
                position: 'relative',
                top: `${((window.innerWidth / 8) / 2) - 27}px`
            }
        });

        this.forceUpdate();
    }

    render() {
        const {day} = this.props;
        const {cellStyle, dateStyle} = this.state;
        let date = '';
        date = day.getDate();
        return (
            <div style={cellStyle}>
                <div style={dateStyle}>{date}
                </div>
            </div>
        );
    }
}

StockCalendarDay.propTypes = {
    day: PropTypes.string
};

export default StockCalendarDay;
