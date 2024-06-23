import { memo, useState, useMemo } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, plusCount } from '../store/stockSlice.js';

// Redux
// 컴포넌트들이 props없이 state 공유 가능

// memo 필요 할 때만 재렌더링 시킴
// Child에 전송되는 props가 변할 때만 재렌더링 해줌
// 기존 props랑 신규 props를 계속 비교하므로 막 쓰면 안됨!! (props가 길고 복잡하면 손해)
// 꼭 필요한 무거운 component에만 붙일 것(거의 쓸 일 없음)
// let Child = memo (function() {
//     console.log('재렌더링됨');
//     return <div>자식임</div>
// })

// function 함수() {
//     return 반복문10억번 돌린 결과
// }

function Cart() {

    // let result = 함수();
    // useMemo - 컴포넌트 렌더링시 1회만 실행
    // [state] - state가 변경 될 때만 실행
    // useMemo(() => {return 함수()}, [state]);
    // useEffect와의 차이
    // useEffect는 모든 html코드가 실행 된 후 실행
    // useMemo는 렌더링 될 때 같이 실행
    // 실행 시점 차이

    let state = useSelector((state) => state); // return state.stock 로 하면 stock 부분만 불러올 수 있음
    let dispatch = useDispatch();
    let [count, setCount] = useState(0);
    return (
        <div>
            {/* <Child></Child> */}
            <button onClick={() => {setCount(count + 1)}}>+</button>
            {/* <button type='button' onClick={() => dispatch(changeAge(10))}>버튼</button> */}
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {state.stock.map((a, i) =>
                            <tr key={i}>
                                <td>{state.stock[i].id}</td>
                                <td>{state.stock[i].name}</td>
                                <td>{state.stock[i].count}</td>
                                <td>
                                    <button onClick={() => dispatch(plusCount(state.stock[i].id))}>추가</button>
                                </td>
                                <td>
                                    <button onClick={() => dispatch(deleteItem(state.stock[i].id))}>삭제</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Cart;