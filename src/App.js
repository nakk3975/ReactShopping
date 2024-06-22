import { createContext, useEffect, useState } from 'react';
import { Nav, NavDropdown, Navbar } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import data from './data.js';
import About from './routes/About.js';
import Cart from './routes/Cart.js';
import Detail from './routes/Detail.js';
import Event from './routes/Event.js';
import Main from './routes/Main.js';
import axios from 'axios';
import { useQuery } from 'react-query';

export let Context1 = createContext();

function App() {

  // let obj = {name : 'kim'};
  // localStorage.setItem('data', JSON.stringify(obj));
  // let 꺼낸거 = localStorage.getItem('data');
  // console.log(JSON.parse(꺼낸거).name);
  let [shoes, setShoes] = useState(data); 
  let [inventory, setInventory] = useState([10, 11, 12]);
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('watched')) {
      localStorage.setItem('watched', JSON.stringify([]));
    }
  }, [])

  let result = useQuery('name', () => {
    return axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
      return a.data;
    }),
    { staleTime : 2000 }
  })

  // 장점 1. 성공/실패/로딩중 쉽게 파악 가능
  // result.data - 성공
  // result.isLoading - 로딩중
  // result.error - 실패
  // 장점 2. 틈만나면 자동으로 refetch 해줌
  // 장점 3. 실패시 retry 알아서 해줌
  // 장점 4. state 공유 안해도 됨 - 다른곳에서 똑같이 ajax 요청하면 자동으로 하나로 합쳐서 처리
  // 장점 5. ajax 결과 캐싱기능 - ajax 요청한 결과를 5분동안 캐시에 저장
  // redux-toolkit 설치하면 RTK Query도 자동으로 설치 되지만 문법이 별로라 react-query 추천

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
          <Nav className="ma-auto">
            { result.isLoading && "로딩중" }
            { result.data && result.data.name }
            { result.error && "에러남" }
          </Nav>
        </Container>
      </Navbar>

      {/* React Query - 항상 유용하진 않음, 실시간 데이터가 있을때만 유용 */}
      {/* - ajax 성공/실패 시 html 보여주려면?
      - 몇초마다 자동으로 ajax 요청하려면?
      - 실패시 몇초 후 요청 재시도?
      - prefetch? */}

      {/* <Link to="/">홈</Link> */}
      <Routes>
        <Route path="/" element={<Main shoes={shoes} setShoes={setShoes}/>} />
        <Route path={"/detail/:id"} element={
          <Context1.Provider value={{inventory, shoes}}>
            <Detail shoes={shoes}/>
          </Context1.Provider>} />

        <Route path="/cart" element={<Cart/>} />
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