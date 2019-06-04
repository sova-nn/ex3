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
                { cardId: 0, cardStyle: 'transparent', cardStyleColoured: 'darkseagreen'},
                { cardId: 1, cardStyle: 'transparent', cardStyleColoured: 'darkkhaki'},
                { cardId: 2, cardStyle: 'transparent', cardStyleColoured: 'darkseagreen'},
                { cardId: 3, cardStyle: 'transparent', cardStyleColoured: 'darkkhaki'},
                { cardId: 4, cardStyle: 'transparent', cardStyleColoured: 'sandybrown'},
                { cardId: 5, cardStyle: 'transparent', cardStyleColoured: 'lightseagreen'},
                { cardId: 6, cardStyle: 'transparent', cardStyleColoured: 'lightseagreen'},
                { cardId: 7, cardStyle: 'transparent', cardStyleColoured: 'sandybrown'},
            ]
        };

        this.handleClick = this.handleClick.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.empty = this.empty.bind(this);
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.state.cards !== nextState.cards
    // }

    handleClick(){
        this.setState({
            isClicked: !this.state.isClicked
        });
        console.log('button clicked');
    }

    // я не понимаю, почему после изменения стейта не меняются дочерние компоненты Card
    empty = () => {
        this.setState((state) => {
            state.cards[0].cardStyle = 'transparent'
            return state;
        });
        console.log(this.state);
    }

    changeColor (cardId){
        const newCards = this.state.cards;
        newCards[cardId].cardStyle = newCards[cardId].cardStyleColoured;
        this.setState({
            cards: newCards
        });
        console.log(this.state);
    }




    render() {
        const mycards = this.state.cards;
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
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}