import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default class Card extends React.Component{
//    style={{background: this.props.styleColoured}}




    render() {
        return(
            <Col className='card'>Карточка {this.props.id} {this.props.name}</Col>
        );
    }
}