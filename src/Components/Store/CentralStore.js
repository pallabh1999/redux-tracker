import { configureStore } from "@reduxjs/toolkit";
import ExpenseSlice from './ExpensesSlice'
import UserSlice from './UserSlice'

const store = configureStore({
    reducer:{
        userInfo : UserSlice,
        expense : ExpenseSlice,
    }
})

export default store;