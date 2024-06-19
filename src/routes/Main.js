import axios from 'axios';
import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Card from './Card.js';

function Main(props) {

    let [page, setPage] = useState(2);
    let [loading, setLoading] = useState(false);
    // let [recently, setRecently] = useState([]);
    // 컴포넌트가 마운트될 때 localStorage에서 데이터를 가져옴
    // useEffect(() => {
    //     let savedProducts = JSON.parse(localStorage.getItem('watched')) || [];
    //     setRecently(savedProducts);
    // }, []);
    
    return (
        <>
            <div className="main-bg"></div>
            {/* 오리지널 BootStrap */}
            {/* public 폴더 img 저장시 /img.png로 불러 올 수 있음 */}
            {/* src={process.env.PUBLIC_URL + '/img/logo.png'} */}
            {/* 이게 public 폴더 이미지 쓰는 권장 방식 */}
            {/* <div>
                <h5>최근 본 상품</h5>
                <Table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>이름</th>
                        </tr>
                    </thead>
                    <tbody>
                    {recently.map((product, i) =>
                        <tr key={i}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </div> */}
            <div className="container">
                <div className="row">
                {props.shoes.map(function (a, i) {
                    return <Card shoes={props.shoes[i]} key={props.shoes[i].id}></Card>;
                })}
                </div>
            </div>

            {page < 4 && <button className='btn btn-primary' onClick={() => {setLoading(true);
                axios.get('https://codingapple1.github.io/shop/data' + page + '.json')
                .then(( response ) => {
                    let copy = [...props.shoes];
                    copy = copy.concat(...response.data);
                    props.setShoes(copy);
                    let a = page + 1;
                    setPage(a);
                    setLoading(false);
                }).catch(() => {
                    console.log("실패");
                    setLoading(false);
                });
                // axios.post('/safasfas', {name : 'kim'}).then(() => {}) post방식
                // Promise.all([axios.get('/url1'), axios.get('/url2')]).then(() => {}) 동시에 ajax 요청 여러개
                // fetch('/url').then(결과 => 결과.json).then(data => {}) 직접 결과 값을 json으로 파싱 해줘야 함
            }}>버튼</button>}
            {loading && <h6 className='text-success'>로딩중입니다.</h6>}
        </>
    );
}

export default Main;