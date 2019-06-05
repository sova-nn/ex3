import React from 'react';
import { Col } from 'react-bootstrap';

export default class Card extends React.Component{
//    style={{background: this.props.styleColoured}}



    render() {
        const cardStyle = this.props.cardStyle;
        return(
            !this.props.isClicked &&
            <Col className='card'  style={{background: cardStyle}} onClick={(e) => this.props.onPress(this.props.cardId)} >Карточка {this.props.cardId}</Col>
        );
    }
}