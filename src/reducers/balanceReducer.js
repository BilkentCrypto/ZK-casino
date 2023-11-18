import { createSlice } from '@reduxjs/toolkit'
const balanceSlice = createSlice({
    name: 'balance',
    initialState: 10000000,
    reducers:{
        setBalance(state, action){
            return action.payload
        }
    }
})

export const {setBalance} = balanceSlice.actions

export const loadBalance = (account) => {
    return async dispatch =>{
        const balance = 100000000;
        dispatch(setBalance(balance))
    }
}

export default balanceSlice.reducer