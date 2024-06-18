import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeName, changeAge } from '../store/userSlice.js';
import { plusCount, deleteItem } from '../store/stockSlice.js';

// Redux
// 컴포넌트들이 props없이 state 공유 가능

function Cart() {

    let state = useSelector((state) => state); // return state.stock 로 하면 stock 부분만 불러올 수 있음
    let dispatch = useDispatch();
    return (
        <div>
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