import React from 'react';
import Card from './Card';
import {Container, Row} from "react-bootstrap";
import axios from 'axios';

const CARD_BLUE = '#61dafb';

export default class CardSet extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
        };


        this.changeColor = this.changeColor.bind(this);
        this.empty = this.empty.bind(this);
        this.matchCardsColors = this.matchCardsColors.bind(this);
        this.isTwo = this.isTwo.bind(this);
        this.setColor = this.setColor.bind(this);

    }

    loadStatus() {
        axios.get('http://localhost:3001/state')
            .then((res) => {
                this.setState({
                    cards: res.data.cards,
                    isPare: res.data.isPare,
                    isClicked: res.data.isClicked,
                    isLoaded: true
                });
            });
    }

    componentDidMount(){
        this.loadStatus();
    };

    //пока возвращение исходного цвета
    empty = () => {
        this.setState((state) => {
            state.cards.map((el) => {
                el.cardStyle = CARD_BLUE;
            });
            state.isClicked = false;
            state.isPare = false;
            return state;
        });
    };

    changePlayer() {
        this.setState({
            Player1: true
        })
    }

    //смена цвета при открытии карты + установка маркера
    // changeColor (cardId){
    //     const newCards = this.state.cards;
    //     newCards[cardId].cardStyle = newCards[cardId].cardStyleColoured;
    //     (this.state.isClicked) ?
    //         (this.setState(state => {
    //             state.cards = newCards;
    //             state.isPare = true;
    //             console.log('color changed', this.state);
    //             return state;
    //         }))
    //         :
    //         (this.setState(state => {
    //             state.cards = newCards;
    //             state.isClicked = true;
    //
    //             console.log('color changed', this.state);
    //             return state;
    //         }));
    //
    // }

    changeColor(cardId) {
          axios.post('http://localhost:3001/cards/color', {cardId: cardId})
              .then((res) => {
                  this.setState({
                      cards: res.data.cards,
                      isPare: res.data.isPare,
                      isClicked: res.data.isClicked,
                      isLoaded: true
                  })
              })
              .catch((err) => {
                  alert('Обшибка запроса :(');
              });
    }


    //проверка, что карт в объекте 2 (возвращает true/false)
    isTwo(cards) {
        return (cards.length === 2);
    }

    //установка фона для пары одинаковых карт (их всего 2, нет смысла использовать map) - тут функция с конями в вакууме, я не знаю, как сделать по-другому
    // функция проверена, работает
    setColor(cards, color) {
        const newCards = this.state.cards;

        newCards.map((el) => {
            cards.forEach(function(item) {
                    return ((el.cardId === item.cardId) ? el.cardStyle = color : el.cardStyle);
                 });
        });

        this.setState((state) => {
            state.cards = newCards;
            state.isPare = false;
            state.isClicked = false;
            return state;
        });
    }

    //если цвет карт совпадает, карты будут прозрачными, если нет, то исходного цвета
    // если нажато 3 или 1 карта, то карты становятся исходного цвета
    matchCardsColors =() => {
        // массив возвращает объект, содержащий 2 открытые карты
        const openedCards = (this.state.cards.filter((card) => {return ((card.cardStyle !== CARD_BLUE) & (card.cardStyle !== 'transparent'));}));
        ((this.isTwo(openedCards) && openedCards[0].cardStyle === openedCards[1].cardStyle) ? this.setColor(openedCards,'transparent') : this.setColor(openedCards,CARD_BLUE));
        console.log(openedCards);
    }

    render() {
        const mycards = this.state.cards;
        //this.state.isPare && this.matchCardsColors();

        return (
            this.state.isLoaded ?
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
                                    isPare={this.state.isPare}
                                />
                            )}

                            <button onClick={this.empty}>Хочу играть заново</button>
                            <button onClick={() => setTimeout((this.matchCardsColors), 500)}>Проверка цвета</button>
                        </Row>
                    </Container>
                </div>
            </div>
            :
            <div>
                Загрузка...
            </div>
        );
    }
}