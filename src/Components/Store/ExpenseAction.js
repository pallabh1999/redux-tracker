import { ExpenseAction } from "./ExpensesSlice";
import axios from "axios";

export const fetchExpense = (emailAdd) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://trackkkkkkkkkkiiittttt-default-rtdb.firebaseio.com/expenses.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      return data;
    };
    try {
      const data = await fetchData();
      const expenses = [];
      for (const key in data) {
        if (data[key].email === emailAdd) {
          expenses.push({
            id: key,
            expense_type: data[key].expense_type,
            category: data[key].category,
            amount: data[key].amount,
            email: data[key].email,
            text: data[key].text,
          });
        }
      }
      dispatch(ExpenseAction.replaceList(expenses));
    }
    catch (error) {
      console.log(error.message);
    }
  };

};

export const addExpense = (inputData)=>{
  // console.log(inputData);
    return async(dispatch)=>{
        const addexpensehistory = async () => {
        const response = await fetch('https://trackkkkkkkkkkiiittttt-default-rtdb.firebaseio.com/expenses.json', {
        method: 'POST',
        body: JSON.stringify(inputData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return data;
    }
    try{
       const data = await addexpensehistory();
       dispatch(ExpenseAction.addExpenses({
        ...inputData,
        id : data.name
       }))
       fetchExpense(inputData.email)
    }catch(error){
      console.log('failed to add');
    }
}
}

export const removeExpense=(id)=>{
    return async(dispatch)=>{
        const removeexpensehistory = async() => {
            console.log(id);
              const response = await axios.delete(`https://trackkkkkkkkkkiiittttt-default-rtdb.firebaseio.com/expenses/${id}.json`)
              return response;
        }
              try{
                const data = await removeexpensehistory();
                   dispatch(ExpenseAction.removeItem(id))
                 
          }
        
          catch(error){
          console.log(error);  
          }
          
    }
}

export const editHandler=(id)=>{

  return async(dispatch)=>{
    const editItem = async() => {
          const response = await axios.get(`https://trackkkkkkkkkkiiittttt-default-rtdb.firebaseio.com/expenses/${id}.json`)

          const item = response.data;
          dispatch(ExpenseAction.editExpense({
            item :item,
            id : id,
          }))
          return response;
    }
          try{
            const data = await editItem();
            dispatch(removeExpense(id));
            // console.log(data);
      }
      catch(error){
      console.log(error);  
      }
      
}
}