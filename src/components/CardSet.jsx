import React from 'react';
import Card from './Card';
import {Container, Row} from "react-bootstrap";

export default class CardSet extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
            isPare: false,
            cards: [
                { cardId: 0, cardStyle: '#61dafb', cardStyleColoured: 'darkseagreen'},
                { cardId: 1, cardStyle: '#61dafb', cardStyleColoured: 'darkkhaki'},
                { cardId: 2, cardStyle: '#61dafb', cardStyleColoured: 'darkseagreen'},
                { cardId: 3, cardStyle: '#61dafb', cardStyleColoured: 'darkkhaki'},
                { cardId: 4, cardStyle: '#61dafb', cardStyleColoured: 'sandybrown'},
                { cardId: 5, cardStyle: '#61dafb', cardStyleColoured: 'lightseagreen'},
                { cardId: 6, cardStyle: '#61dafb', cardStyleColoured: 'lightseagreen'},
                { cardId: 7, cardStyle: '#61dafb', cardStyleColoured: 'sandybrown'},
            ]
        };

         this.changeColor = this.changeColor.bind(this);
        this.empty = this.empty.bind(this);
        this.matchCardsColors = this.matchCardsColors.bind(this);
        // CardSet.isTwo = CardSet.isTwo.bind(this);
        this.setColor = this.setColor.bind(this);
    }



    //пока возвращение исходного цвета
    empty = () => {
        this.setState((state) => {
            state.cards.map((el) => {
                el.cardStyle = '#61dafb';
            })
            return state;
        });
        console.log(this.state);
    }

    // смена цвета при открытии карты + установка маркера
    changeColor (cardId){
        const newCards = this.state.cards;
        newCards[cardId].cardStyle = newCards[cardId].cardStyleColoured;
        (this.state.isClicked) ?
            this.setState({
                cards: newCards,
                isClicked: true
            })
            :
            this.setState({
                cards: newCards,
                isPare: true
            });
        console.log(this.state);
    }


    //проверка, что карт в объекте 2 (возвращает true/false)
    static isTwo(cards) {
        return (Object.keys(cards).length === 2);
    }

    //установка фона для пары одинаковых карт (их всего 2, нет смысла использовать map)
    setColor(cardId, color) {
        const newCards = this.state.cards;
        newCards[cardId].cardStyle = color;
        this.setState((state) => {
            state.cards = newCards;
            state.isPare = false;
            return state;
        });
    }

    //если цвет карт совпадает, карты будут прозрачными, если нет, то исходного цвета
    matchCardsColors() {
        // массив возвращает объект, содержащий 2 открытые карты
        const openedCards = (this.state.cards.filter((card) => {return (card.cardStyle !== '#61dafb');}));
        (CardSet.isTwo(openedCards) ? this.setColor(openedCards,'transparent') : this.setColor(openedCards,'#61dafb'));
    }






    render() {
        const mycards = this.state.cards;
        // this.state.isPare && this.matchCardsColors();
        return (
            <div>
                <div className='cardset'>
                    <Container>
                        <Row>
                            {mycards.map((el, id) =>
                                <Card
                                    key={id}
                                    {... el}
                                    onPress={this.changeColor}
                                    isClicked={this.state.isClicked}
                                />
                            )}

                            <button onClick={this.empty}>Мне надоело играть</button>
                            <button onClick={this.setColor(this.state.cards, 'blue')}>Всем синий!</button>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}