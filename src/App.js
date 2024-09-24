import React from 'react';
import NaverMap from './component/NaverMap';
import FirstBar from './component/FirstBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import SearchBox from './component/SearchBox';
import SearchList from './component/SearchList';
import ContactForm from './component/SearchPlace';



const App = () => {
  return (
    <div>
      <Container>
        <FirstBar />
          <Row>
            <Col md={8} >
              <SearchBox/>
              
            </Col>
            <Col md={4}>
              <SearchList/>
            </Col>
          </Row>
      </Container>
    </div>
  );
};

export default App;
