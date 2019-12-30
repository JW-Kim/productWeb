import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class NoteCalendarDay extends Component {
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
        const {diaries, day, diseases} = this.props;
        const {cellStyle, dateStyle, dotStyle} = this.state;
        let date = '';
        let diaryYn = false;
        let diseaseYn = false;
        if(!_.isNil(diaries) && !_.isNil(day) && !_.isNil(diseases)) {
            date = day.getDate();
            diaries.forEach(function(diary) {
                if(date === new Date(diary.diaryDt).getDate()) {
                    diaryYn = true;
                }
            });
            diseases.forEach(function(disease) {
                if(date === new Date(disease.diseaseDt).getDate()) {
                    diseaseYn = true;
                }
            });
        }

        const diaryDotStyle = {
            height: '5px',
            width: '5px',
            backgroundColor: '#142765',
            borderRadius: '50%',
            display: 'inline-block'
        };
        const diseaseDotStyle = {
            height: '5px',
            width: '5px',
            backgroundColor: '#E6ECF0',
            borderRadius: '50%',
            display: 'inline-block'
        };

        return (
            <div style={cellStyle}>
                <div style={dateStyle}>{date}
                </div>
                <div style={dotStyle}>
                    {diaryYn && <span style={diaryDotStyle}></span>}
                    {diseaseYn && <span style={diseaseDotStyle}></span>}
                </div>
            </div>
        );
    }
}

NoteCalendarDay.propTypes = {
    diaries: PropTypes.object,
    diseases: PropTypes.object,
    day: PropTypes.string
};

export default NoteCalendarDay;
