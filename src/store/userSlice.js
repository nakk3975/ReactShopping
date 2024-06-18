import { createSlice } from '@reduxjs/toolkit';

let user = createSlice({
    name : 'user',
    initialState : {name : 'kim', age : 20},
    /* state 변경하는 법
        - state 수정 해 주는 함수 만들기
        - 원할 때 함수 실행해 달라고 store.js에 요청
    */
    reducers : {
        changeName(state) {
            state.name = 'park'
            // state는 기존 내용
        },   // 추가 하고 싶으면 , 후 함수 추가
        changeAge(state, a) {
            state.age += a;
        }
    }
})

// 만든 함수 export
export let {changeName, changeAge} = user.actions;

export default user