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

    //пока возвращение исходного цвета, потом будет не нужен
    empty() {
        axios.get('http://localhost:3001/cards/new-game')
            .then((res) => {
                this.setState({
                    cards: res.data.cards,
                    isPare: res.data.isPare,
                    isClicked: res.data.isClicked,
                    isLoaded: true
                });
            });
    }

    //смена цвета при открытии карты + установка маркера
    changeColor(cardId) {
      axios.post('http://localhost:3001/cards/card-open', {cardId: cardId})
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

    //установка фона для пары одинаковых карт
    setColor(cards, color) {
        axios.post('http://localhost:3001/cards/color-change', {cards: cards, color: color})
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

    //если цвет карт совпадает, карты будут прозрачными, если нет, то исходного цвета
    // если нажато 3 или 1 карта, то карты становятся исходного цвета
    matchCardsColors =() => {
        // массив возвращает объект, содержащий 2 открытые карты, затем эти карты исчезают или закрываются в зависимости от того, одинаковый они или нет
        const openedCards = (this.state.cards.filter((card) => {return ((card.cardStyle !== CARD_BLUE) & (card.cardStyle !== 'transparent'));}));
        //если открытых карт не 2, то все карты окрашиваются в исходный цвет
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