// state 저장하는 파일 보통 store.js로 만듬
import { configureStore } from '@reduxjs/toolkit'; // Redux Toolkit = Redux 개선버전
import user from './store/userSlice';
import stock from './store/stockSlice';

/*  Redux 쓰는 이유
    - 컴포넌트간 state 공유 편해짐
    - 간단한 프로젝트는 props 쓰는게 나음 (공유 할 state가 적을 경우)

    store의 state 수정은
    1. 수정함수 만들기
    2. export
    3. 원하는 곳에서 import후
    4. dispatch로 가져다 쓰기
*/


export default configureStore({
    reducer: {
        user : user.reducer,
        stock : stock.reducer
    }
});