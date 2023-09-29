import { createSlice } from "@reduxjs/toolkit";
const ExpenseSlice = createSlice({
    name : 'expense',
    initialState : {
        expenses : [],
        editItem : {},
        isEdit : false,
    },
    reducers:{
        addExpenses(state,action){
            console.log(action.payload);
            state.expenses.push(action.payload);
        },
        replaceList(state,action){
            state.expenses = action.payload;
        },
        removeItem(state,action){
            state.isEdit = false;
            state.expenses = state.expenses.filter((item) => item.id !== action.payload);
            state.editItem = {};
        },
        editExpense(state,action){
            state.editItem = action.payload.item;
            state.expenses = state.expenses.filter((item) => item.id !== action.payload.id);
            state.isEdit = true;
        }        

     
    }
})

export const ExpenseAction = ExpenseSlice.actions;
export default ExpenseSlice.reducer;