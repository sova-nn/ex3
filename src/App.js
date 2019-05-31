import React from 'react';
import './App.css';
import 'react-bootstrap';
import { Container } from 'react-bootstrap';

import CardSet from './components/CardSet';

function App() {
  return (
      <Container className='app'>
          <CardSet />
      </Container>
  );
}

export default App;
