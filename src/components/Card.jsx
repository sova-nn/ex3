import React from 'react';
import { Col } from 'react-bootstrap';

export default class Card extends React.Component{
//    style={{background: this.props.styleColoured}}


    render() {
        return(
            <Col className='card'  style={{background: this.props.style}} onClick={(e) => this.props.onPress(this.props.value)} >Карточка {this.props.value}</Col>
        );
    }
}