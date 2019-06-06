import React from 'react';
import { Col } from 'react-bootstrap';

const CARD_BLUE = '#61dafb';

export default class Card extends React.Component{
//    style={{background: this.props.styleColoured}}



    render() {
        const cardStyle = this.props.cardStyle;

        return(
            <Col className='card'
                 style={{background: cardStyle}}
                 onClick={((this.props.cardStyle === CARD_BLUE) && (!this.props.isPare)) ? ((e) => this.props.onPress(this.props.cardId)) : undefined}
            />
        );
    }
}