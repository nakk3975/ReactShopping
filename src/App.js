import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './App.css';
import data from './data.js';
import Detail from './routes/Detail.js';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';

function App() {

  let [shoes] = useState(data); 
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
        <Route path="/" element={<Main shoes={shoes}/>} />
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

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

function About() {
  return (
    <div>
      <h4>회사 정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Main(props) {
  return (
    <>
      <div className="main-bg"></div>
      {/* 오리지널 BootStrap */}
      {/* public 폴더 img 저장시 /img.png로 불러 올 수 있음 */}
      {/* src={process.env.PUBLIC_URL + '/img/logo.png'} */}
      {/* 이게 public 폴더 이미지 쓰는 권장 방식 */}
      <div className="container">
        <div className="row">
          {
            props.shoes.map(function(a, i) {
              return (
                <Card shoes={props.shoes[i]} i={i}></Card>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

function Card(props) {
  return ( 
    <div className="list col-md-4">
      <Link to={"/detail/" + props.shoes.id}>
        <img src={"https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"} path={"/detail/:id"} width="80%"/>
      </Link>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
    </div>
  );
}

export default App;
