import React, {useContext, useEffect, useState } from "react";
import Nav from 'react-bootstrap/Nav';
import { useParams } from "react-router-dom";
import { Context1 } from '../App.js';
import { addItem } from "../store/stockSlice.js";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// import styled from 'styled-components';

// let BlueButton = styled.button`
//     background : ${props => props.bg};
//     color : ${props => props.bg == 'blue' ? 'white' : 'black'};
//     padding : 10px;
// `

// let Box = styled.div`
//     background : gray;
//     padding : 20px;
// `

// 옛날 문법
// class Detail2 extends React.Component {
//     componentDidMount() {

//     }
//     componentDidUpdate() {

//     }
//     componentWillUnmount() {

//     }
// }

function Detail(props) {

    let [time, setTime] = useState(true);
    let [timer, setTimer] = useState(2);
    let [text, setText] = useState("");
    let [showWarning, setShowWarning] = useState(false);
    // useEffect 안에 있는 코드는 html 랜더링 후에 동작
    useEffect(() => {
        // mount, update 작동
        let a = setTimeout(() =>{
            setTime(false);
        }, 2000)

        let b = setTimeout(() =>{
            setTimer(timer - 1);
        }, 1000)
        return () => {
            clearTimeout(a);
            clearTimeout(b);
        }
    }, []) 
    
    useEffect(() => {
        if(isNaN(text)) {
            setShowWarning(true);
        } else {
            setShowWarning(false);
        }
    }, [text])
    
    // 처음 1회만 작동시 뒤에 ,[] mount시
    // useEffect 안에 return 작성시 userEffect 동작 전에 실행

    // useEffect(() => {  })       1. 재렌더링마다 코드 실행
    // useEffect(() => {  }, [])   2. mount시 1회 코드 실행
    // useEffect(() => { 
    //     return () => {
    //         3. unmount시 1회 코드 실행
    //     }
    // }) 
    // 4. useEffect 실행 전에 뭔가 실행 하려면 언제나 return () => {}
    // useEffect(() => {  }, [count]) 5. 특정 state 변경시에만 실행하려면 [state명]

    let {id} = useParams();
    let goods = props.shoes.find((x) => {return x.id == id});
    let [tab, setTab] = useState(0);
    let [a, setA] = useState('');

    useEffect (() => {
        let end = setTimeout(() => {setA('a-end')}, 100)
        return () => {
            clearTimeout(end);
            setA('');
        }
    }, [])

    

    useEffect(() => {
        let 꺼낸거 = localStorage.getItem('watched');
        꺼낸거 = JSON.parse(꺼낸거);
        꺼낸거.push(goods.id);
        꺼낸거 = new Set(꺼낸거);
        꺼낸거 = Array.from(꺼낸거);
        localStorage.setItem('watched', JSON.stringify(꺼낸거));
    }, [])

    let state = useSelector((state) => state);
    let dispatch = useDispatch();

    return(
        <div className={"container a-start " + a}>
            {
                time == false ? 
                null : 
                <div className="alert alert-warning">
                    {timer}초이내 구매시 할인
                </div>
            }
            
            {/* {count}
            <button onClick={() => {setCount(count + 1)}}>버튼</button> */}
            {/* <Box>
                <BlueButton>버튼</BlueButton>
            </Box> */}
            {/* <BlueButton bg="yellow">버튼</BlueButton>
            <BlueButton bg="orange">버튼</BlueButton>
            <BlueButton bg="blue">버튼</BlueButton> */}
            
            <div className="row">
                <div className="col-md-6">
                    <img src={"https://codingapple1.github.io/shop/shoes" + (Number(goods.id) + 1) + ".jpg"} width="100%" />
                </div>
                <div className="col-md-6">
                    {/* <input type="text" onChange={(e) => { setText(e.target.value) }}></input>
                    {showWarning && <h6 className="text-danger" aria-disabled>숫자만 입력하세요</h6>} */}
                    <h4 className="pt-5">{goods.title}</h4>
                    <p>{goods.content}</p>
                    <p>{goods.price}원</p>
                    <Link to={"/cart"}>
                        <button className="btn btn-danger" onClick={() => {dispatch(addItem({id : goods.id, name : goods.title, count : 1}))}}>주문하기</button> 
                    </Link>
                </div>
            </div>

            <Nav variant="tabs" defaultActiveKey="link-0">
                <Nav.Item>
                    <Nav.Link eventKey="link-0" onClick={(() => {setTab(0)})}>버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={(() => {setTab(1)})}>버튼2</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" onClick={(() => {setTab(2)})}>버튼3</Nav.Link>
                </Nav.Item>
            </Nav>
            {/* {tab == 0 && <div>내용0</div>}
            {tab == 1 && <div>내용1</div>}
            {tab == 2 && <div>내용2</div>} */}
            <TabContent tab={tab}/>
        </div> 
    )
}

function TabContent({tab}) {
    // if(tab == 0) {
    //     return <div>내용0</div>
    // } else if(tab == 1) {
    //     return <div>내용1</div>
    // } else if(tab == 2) {
    //     return <div>내용2</div>
    // } else {
    //     return <div>존재하지 않는 페이지 입니다.</div>
    // }

    let [fade, setFade] = useState('');
    let {inventory} = useContext(Context1);

    useEffect(() => {
        let a = setTimeout(() => { setFade('end') },100)
        return () => {
            clearTimeout(a);
            setFade('')
        }
    }, [tab])
    
    // 1. Context API (리액트 기본 문법)
    //   - props 전송 없이 state 공유 가능
    //   - 단점 : 성능 이슈, 재활용이 어렵다
    //   - Context API 가 변경되면 안 쓰는 다른 변수, 자식들도 무조건 재 랜더링
    //   - 다른 페이지에서 컴포넌트를 부르면 꼬인다.
    // 2. Redux 등 외부 라이브러리 사용

    return <div className={"start " + fade}>    {/*{`start ${fade}`}*/}
        {[<div>{inventory}</div>, <div>내용1</div>, <div>내용2</div>][tab]}
    </div>
}
    
export default Detail;