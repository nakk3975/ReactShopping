import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import data from './data.js';
import About from './routes/About.js';
import Detail from './routes/Detail.js';
import Event from './routes/Event.js';
import Main from './routes/Main.js';

function App() {

  let [shoes, setShoes] = useState(data); 
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar expand="lg" bg="light" variant='light'>
        <Container>
          <Navbar.Brand href="/">Won's Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
              <Nav.Link onClick={() => { navigate('/detail') }}>Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* <Link to="/">홈</Link> */}
      <Routes>
        <Route path="/" element={<Main shoes={shoes} setShoes={setShoes}/>} />
        <Route path={"/detail/:id"} element={<Detail shoes={shoes}/>} />
        {/* 
        nested routes 라고 함
        장점1. route 작성이 약간 간단해짐
        장점2. nested route 접속시엔 element 2개가 보임
         */}
        <Route path="/about" element={<About/>} >
          <Route path="member" element={<div>멤버임</div>}/>
          <Route path="location" element={<div>위치정보임</div>} />
        </Route>
        <Route path="/event" element={<Event/>} >
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰 받기</div>} />
        </Route>
        {/* 위랑 동일 코드
        <Route path="/about/member" element={<About/>} />
        <Route path="/about/location" element={<About/>} /> */}
        {/* 404에러 페이지
        <Route path="*" element={<div>없는 페이지 입니다</div>} /> */}
      </Routes>
    </div>
  );
}

export default App;