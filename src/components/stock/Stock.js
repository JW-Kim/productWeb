import React, { Component } from 'react';
import {Modal, Row, Col, Container, Card, Table, Button} from 'react-bootstrap';
import DayPicker from 'react-day-picker';
import $ from 'jquery';

import ModalHeader from '../com/ModalHeader';
import {myModal, modalBody} from '../../assets/styles/com.scss';
import {noteList} from '../../assets/styles/set.scss';
import {card} from '../../assets/styles/stock.scss';
import {Line} from 'react-chartjs-2';
import {getTodayDt, getDt} from '../com/ComSvc';
import StockRest from '../../apis/StockRest';
import StockCalendarNav from './StockCalendarNav';
import StockCalendarDay from './StockCalendarDay';
import styled from 'styled-components';
import {openPop} from '../com/ModalSvc';
import StockDtl from './StockDtl';
import {toast} from '../com/ComSvc';

const MONTHS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
const WEEKDAYS_SHORT = ['일', '월', '화', '수', '목', '금', '토'];

class Stock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stockList: [],
            stockDt: new Date(getTodayDt())
        };
    }

    componentDidMount() {
        this.promise = new $.Deferred();
        $('.modal-backdrop').css('z-index', '1050');
    }

    async getStockList(stockDt) {
        const res = await StockRest.selectStockList({stockDt: getDt(stockDt)});
        this.setState({ stockList: res.data.data });
    }

    getData(item) {
        if(item.direction === 'UP') {
            let labels = [];
            let data = [];
            const firstLine = this.onGetFirstLine(item);
            const secondLine = this.onGetSecondLine(item);
            if(item.preClosingPrice < firstLine) {
                if(item.price < firstLine) {
                    if(item.preClosingPrice < item.price) {
                        labels = ['전고점', '전저점', '전날 종가', '매입가', '1차', '2차'];
                        data = [item.maxPrice, item.minPrice, item.preClosingPrice, item.price, firstLine, secondLine];
                    }else{
                        labels = ['전고점', '전저점', '매입가', '전날 종가', '1차', '2차'];
                        data = [item.maxPrice, item.minPrice, item.price, item.preClosingPrice, firstLine, secondLine];
                    }
                } else if(item.price >= firstLine && item.price <= secondLine) {
                    labels = ['전고점', '전저점', '전날 종가', '1차', '매입가', '2차'];
                    data = [item.maxPrice, item.minPrice, item.preClosingPrice, firstLine, item.price, secondLine];
                } else {
                    labels = ['전고점', '전저점', '전날 종가', '1차', '2차', '매입가'];
                    data = [item.maxPrice, item.minPrice, item.preClosingPrice, firstLine, secondLine, item.price];
                }
            } else if(item.preClosingPrice >= firstLine && item.preClosingPrice <= secondLine) {
                if(item.price < firstLine) {
                    labels = ['전고점', '전저점', '매입가', '1차', '전날 종가', '2차'];
                    data = [item.maxPrice, item.minPrice, item.price, firstLine, item.preClosingPrice, secondLine];
                } else if(item.price >= firstLine && item.price <= secondLine) {
                    if(item.preClosingPrice < item.price) {
                        labels = ['전고점', '전저점', '1차', '전날 종가', '매입가', '2차'];
                        data = [item.maxPrice, item.minPrice, firstLine, item.preClosingPrice, item.price, secondLine];
                    }else{
                        labels = ['전고점', '전저점', '1차', '매입가', '전날 종가', '2차'];
                        data = [item.maxPrice, item.minPrice, firstLine, item.price, item.preClosingPrice, secondLine];
                    }
                } else {
                    labels = ['전고점', '전저점', '1차', '전날 종가', '2차', '매입가'];
                    data = [item.maxPrice, item.minPrice, firstLine, item.preClosingPrice, secondLine, item.price];
                }
            } else {
                if(item.price < firstLine) {
                    labels = ['전고점', '전저점', '매입가', '1차', '2차', '전날 종가'];
                    data = [item.maxPrice, item.minPrice, item.price, firstLine, secondLine, item.preClosingPrice];
                } else if(item.price >= firstLine && item.price <= secondLine) {
                    labels = ['전고점', '전저점', '1차', '매입가', '2차', '전날 종가'];
                    data = [item.maxPrice, item.minPrice, firstLine, item.price, secondLine, item.preClosingPrice];
                } else {
                    if(item.preClosingPrice < item.price) {
                        labels = ['전고점', '전저점', '1차', '2차', '전날 종가', '매입가'];
                        data = [item.maxPrice, item.minPrice, firstLine, secondLine, item.preClosingPrice, item.price];
                    }else{
                        labels = ['전고점', '전저점', '1차', '2차', '매입가', '전날 종가'];
                        data = [item.maxPrice, item.minPrice, firstLine, secondLine, item.price, item.preClosingPrice];
                    }
                }
            }

            return {
                labels: labels,
                datasets: [
                    {
                        label: '',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 10,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: data
                    }
                ]
            };
        }
        let labels = [];
        let data = [];
        const firstLine = this.onGetFirstLine(item);
        const secondLine = this.onGetSecondLine(item);
        if(item.preClosingPrice > firstLine) {
            if(item.price > firstLine) {
                if(item.preClosingPrice > item.price) {
                    labels = ['전저점', '전고점', '전날 종가', '매입가', '1차', '2차'];
                    data = [item.minPrice, item.maxPrice, item.preClosingPrice, item.price, firstLine, secondLine];
                }else{
                    labels = ['전저점', '전고점', '매입가', '전날 종가', '1차', '2차'];
                    data = [item.minPrice, item.maxPrice, item.price, item.preClosingPrice, firstLine, secondLine];
                }
            } else if(item.price <= firstLine && item.price >= secondLine) {
                labels = ['전저점', '전고점', '전날 종가', '1차', '매입가', '2차'];
                data = [item.minPrice, item.maxPrice, item.preClosingPrice, firstLine, item.price, secondLine];
            } else {
                labels = ['전저점', '전고점', '전날 종가', '1차', '2차', '매입가'];
                data = [item.minPrice, item.maxPrice, item.preClosingPrice, firstLine, secondLine, item.price];
            }
        } else if(item.preClosingPrice <= firstLine && item.preClosingPrice >= secondLine) {
            if(item.price > firstLine) {
                labels = ['전저점', '전고점', '매입가', '1차', '전날 종가', '2차'];
                data = [item.minPrice, item.maxPrice, item.price, firstLine, item.preClosingPrice, secondLine];
            } else if(item.price <= firstLine && item.price >= secondLine) {
                if(item.preClosingPrice > item.price) {
                    labels = ['전저점', '전고점', '1차', '전날 종가', '매입가', '2차'];
                    data = [item.minPrice, item.maxPrice, firstLine, item.preClosingPrice, item.price, secondLine];
                }else{
                    labels = ['전저점', '전고점', '1차', '매입가', '전날 종가', '2차'];
                    data = [item.minPrice, item.maxPrice, firstLine, item.price, item.preClosingPrice, secondLine];
                }
            } else {
                labels = ['전저점', '전고점', '1차', '전날 종가', '2차', '매입가'];
                data = [item.minPrice, item.maxPrice, firstLine, item.preClosingPrice, secondLine, item.price];
            }
        } else {
            if(item.price > firstLine) {
                labels = ['전저점', '전고점', '매입가', '1차', '2차', '전날 종가'];
                data = [item.minPrice, item.maxPrice, item.price, firstLine, secondLine, item.preClosingPrice];
            } else if(item.price <= firstLine && item.price >= secondLine) {
                labels = ['전저점', '전고점', '1차', '매입가', '2차', '전날 종가'];
                data = [item.minPrice, item.maxPrice, firstLine, item.price, secondLine, item.preClosingPrice];
            } else {
                if(item.preClosingPrice > item.price) {
                    labels = ['전저점', '전고점', '1차', '2차', '전날 종가', '매입가'];
                    data = [item.minPrice, item.maxPrice, firstLine, secondLine, item.preClosingPrice, item.price];
                }else{
                    labels = ['전저점', '전고점', '1차', '2차', '매입가', '전날 종가'];
                    data = [item.minPrice, item.maxPrice, firstLine, secondLine, item.price, item.preClosingPrice];
                }
            }
        }

        return {
            labels: labels,
            datasets: [
                {
                    label: '',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 10,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: data
                }
            ]
        };
    }
    onGetFirstLine = (item) =>{
        if(item.direction === 'UP') {
            const divide = Math.round((item.maxPrice - item.minPrice) / 3);
            return item.minPrice + divide;
        }
        const divide = Math.round((item.maxPrice - item.minPrice) / 3);
        return item.maxPrice - divide;
    }

    onGetSecondLine = (item) => {
        if (item.direction === 'UP') {
            const divide = Math.round((item.maxPrice - item.minPrice) / 3);
            return item.maxPrice - divide;
        }
        const divide = Math.round((item.maxPrice - item.minPrice) / 3);
        return item.minPrice + divide;
    }

    onClose = () => {
        return this.promise.resolve();
    }

    onDayClick = (stockDt) => {
        this.setState({stockDt});
        this.getStockList(stockDt);
        this.getData();
    }

    openStockDtl = (type, stockId) => {
        const {stockDt} = this.state;
        openPop(<StockDtl type={type} stockId={stockId} stockDt={getDt(stockDt)} close={() => this.onCloseStockDtl()} />).then(() => {
            this.getStockList(stockDt);
            this.getData();
        });
    }

    onCloseStockDtl = () => {
        const {stockDt} = this.state;
        this.getStockList(stockDt);
        this.getData();
    }

    async deleteStock(stockId) {
        const {stockDt} = this.state;
        const res = await StockRest.deleteStock(stockId);
        if (res.status === 200) {
            toast('저장되었습니다.');
            this.getStockList(stockDt);
            this.getData();
        }else {
            toast('등록을 실패하였습니다.');
        }
    }

    renderDay = (day) => {
        return (
            <StockCalendarDay day={day} />
        );
    }

    renderStock = () => {
        const {stockList} = this.state;

        const items = stockList.map((item) => (
            <Card className={card}>
                <Card.Body>
                    <Card.Title>
                        {item.companyNm}
                        <Button onClick={() => this.openStockDtl('UPDATE', item.stockId)}>수정</Button>
                        <Button onClick={() => this.deleteStock(item.stockId)}>삭제</Button>
                    </Card.Title>
                    <Card.Text>
                        <Table striped bordered hover size="sm">
                            <tbody>
                            <tr>
                                <td>전고점</td>
                                <td>{item.maxPrice}</td>
                            </tr>
                            <tr>
                                <td>전저점</td>
                                <td>{item.minPrice}</td>
                            </tr>
                            <tr>
                                <td>전날 종가</td>
                                <td>{item.preClosingPrice}</td>
                            </tr>
                            <tr>
                                <td>매입가</td>
                                <td>{item.price}</td>
                            </tr>
                            <tr>
                                <td>1차</td>
                                <td>{this.onGetFirstLine(item)}</td>
                            </tr>
                            <tr>
                                <td>2차</td>
                                <td>{this.onGetSecondLine(item)}</td>
                            </tr>
                            </tbody>
                        </Table>
                        <Row>
                            <Col xs={12}>
                                <Line data={this.getData(item)} />
                            </Col>
                        </Row>
                    </Card.Text>
                </Card.Body>
            </Card>
        ));

        return <div style={{width: '100%'}}>{items}</div>;
    }

    render() {
        const {stockDt} = this.state;

        return (
            <div>
                <Modal show={true} dialogClassName={myModal}>
                    <ModalHeader title="주식" type="LEFT" close={() => this.onClose()} />
                    <Modal.Body>
                        <div className={modalBody}>
                            <Container style={{padding: '5px', height: '100%'}}>
                                <WrapperStyled>
                                    <DayPicker
                                        locale="ko"
                                        months={MONTHS}
                                        weekdaysShort={WEEKDAYS_SHORT}
                                        onDayClick={this.onDayClick}
                                        selectedDays={stockDt}
                                        renderDay={day => this.renderDay(day)}
                                        navbarElement={<StockCalendarNav />}
                                    />
                                </WrapperStyled>
                                <div className={noteList}>
                                    <Row>
                                        <Col xs={2} onClick={() => this.openStockDtl('CREATE')}>
                                            <span className="material-icons" style={{'color': '#4caf50', 'fontSize': '20px'}}>add_circle</span>
                                        </Col>
                                        <Col xs={10} />
                                    </Row>
                                    <Row>
                                        {this.renderStock()}
                                    </Row>
                                </div>
                            </Container>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

const WrapperStyled = styled.div`
  &&& {
    .DayPicker,
    .DayPicker-wrapper {
      :focus {
        outline: none;
      }
      width: 100%;
      font-size: 18px;
    }

    .DayPicker-Weekday {
      color: #E6ECF0;
      font-family: 'Montserrat-SemiBold';
    }
    
    .DayPicker-Day {
        padding: 0px;
    }
    
    .DayPicker-Caption {
        text-align: center;
    }
    
    .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside):hover, .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
        background-color: #1abc9c;
    }
}`;

export default Stock;
