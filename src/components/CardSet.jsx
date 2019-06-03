import React from 'react';
import Card from './Card';
import {Container, Row} from "react-bootstrap";

export default class CardSet extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
            // color: this.cards.cardStyleColoured,
            cards: [
                { cardId: 0, cardStyle: 'empty', cardStyleColoured: 'darkseagreen'},
                { cardId: 1, cardStyle: 'empty', cardStyleColoured: 'darkkhaki'},
                { cardId: 2, cardStyle: 'empty', cardStyleColoured: 'darkseagreen'},
                { cardId: 3, cardStyle: 'empty', cardStyleColoured: 'darkkhaki'},
                { cardId: 4, cardStyle: 'empty', cardStyleColoured: 'sandybrown'},
                { cardId: 5, cardStyle: 'empty', cardStyleColoured: 'lightseagreen'},
                { cardId: 6, cardStyle: 'empty', cardStyleColoured: 'lightseagreen'},
                { cardId: 7, cardStyle: 'empty', cardStyleColoured: 'sandybrown'},
            ]
        };

        this.handleClick = this.handleClick.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.empty = this.empty.bind(this);
    }

    handleClick(){
        this.setState({
            isClicked: !this.state.isClicked
        });
        console.log('button clicked');
    }

    empty() {
        const emptyCards = this.state.cards;
        emptyCards.forEach((el) => {
            el.cardStyle = 'empty';
        });
        this.setState({
            cards: emptyCards,
            isClicked: true
        });

    }

    changeColor (cardId){
        const newCards = this.state.cards;
        newCards[cardId].cardStyle = newCards[cardId].cardStyleColoured;
        this.setState({
            cards: newCards
        });
    }


    render() {
        return (
            <div>
                <div className='cardset'>
                    <Container>
                        <Row>
                            {this.state.cards.map((el, id) =>
                                <Card
                                    key={el.cardId}
                                    value={id}
                                    style={el.cardStyle}
                                    onPress={this.changeColor}
                                    isClicked={this.state.isClicked}
                                    />

                            )}
                            <button onClick={() => this.empty()}>Мне надоело играть</button>
                        </Row>
                    </Container>
                </div>
                  <button onClick={this.empty}>Тык</button>
            </div>
        );
    }
}