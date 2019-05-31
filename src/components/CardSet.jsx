import React from 'react';
import Card from './Card';
import {Container, Row, Col} from "react-bootstrap";

export default class CardSet extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
            color: 'blue',
        };

        this.cards = [
            { cardId: 0, cardStyle: 'empty', cardStyleColoured: 'red'},
            { cardId: 1, cardStyle: 'empty', cardStyleColoured: 'blue'},
            { cardId: 2, cardStyle: 'empty', cardStyleColoured: 'red'},
            { cardId: 3, cardStyle: 'empty', cardStyleColoured: 'blue'},
            { cardId: 4, cardStyle: 'empty', cardStyleColoured: 'black'},
            { cardId: 5, cardStyle: 'empty', cardStyleColoured: 'black'},
            { cardId: 6, cardStyle: 'empty', cardStyleColoured: 'green'},
            { cardId: 7, cardStyle: 'empty', cardStyleColoured: 'green'},
        ];

        this.handleClick = this.handleClick.bind(this);
        this.changeColor = this.changeColor.bind(this);
    }

    handleClick(){
        this.setState({
            isClicked: !this.state.isClicked
        });
        console.log('button clicked');
    }

    // SetOpen() {
    //     this.
    // }
    changeColor (){
        this.setState({
            color: 'yellow'
        });
    }


    render() {
        return (
            <div>
                <div className='cardset'>
                    <Container>
                        <Row>
                            {this.cards.map((card) =>
                                <Card
                                    key={card.cardId}
                                    id={card.cardId}
                                    style={card.cardStyle}
                                    styleColoured={card.cardStyleColoured}
                                    name={this.state.isClicked}
                                    cangeColor={this.changeColor}
                                    />
                            )}
                        </Row>
                    </Container>
                </div>
                <button onClick={ () => this.handleClick() }>Тык</button>
            </div>
        );
    }
}