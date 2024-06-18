import { createSlice } from '@reduxjs/toolkit';

let stock = createSlice({
    name : 'stock',
    initialState : 
    [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers : {
        plusCount(state, action) {
            let index = state.findIndex((a) => a.id === action.payload)
            state[index].count++;
            

            /* 
            let item = state.find((item) => item.id === action.payload);
            if (item) {
                item.count++;
            }
            */
        },
        addItem(state, action) {
            let index = state.findIndex((a) => a.id === action.payload.id);
            if (index != -1) {
                state[index].count++;
            } else {
                state.push(action.payload);
            }
            // let item = state.find((item) => item.id === action.payload.id);
            // if(item) {
            //     item.count++;
            // } else {
            //     state.push(action.payload);
            // }
        },
        deleteItem(state, action) {
            return state.filter((item) => item.id !== action.payload);
        }
    }
})

export let {plusCount, addItem, deleteItem} = stock.actions;

export default stock