import React, {  useRef } from 'react';
import Card from './UI/Card';
import Expfclass from './ExpenseForm.module.css';
import { Form,Row,Col   } from 'react-bootstrap';
import { addExpense, fetchExpense } from '../../Store/ExpenseAction';
import { useDispatch, useSelector } from 'react-redux';



const ExpenseForm = () => {
  const userEmail =  useSelector((state)=> state.userInfo.email)
  const isEdit = useSelector((state)=> state.expense.isEdit);
  const editItem = useSelector((state)=>state.expense.editItem)

  const dispatch = useDispatch();
  const typeRef = useRef();
  const categoryRef = useRef();
  const textRef = useRef();
  const amountRef = useRef();


  if (isEdit) {
    console.log(editItem);
    
    categoryRef.current.value = editItem.category;
    typeRef.current.value = editItem.expense_type
    textRef.current.value = editItem.text
    amountRef.current.value = editItem.amount;
    
  }
  const expenseFormHandler = (event) => {
    event.preventDefault();
    const category = categoryRef.current.value;
    const type = typeRef.current.value;
    const text = textRef.current.value;
    const amount = amountRef.current.value;
    
    const inputData = {
      email : userEmail,
      text: text,
      expense_type : type,
      category : category,
      amount: amount,
    };
    dispatch(addExpense(inputData));
    dispatch(fetchExpense(userEmail))
    textRef.current.value = "";
    amountRef.current.value = "";
    categoryRef.current.value = ''; 
    typeRef.current.value="";
  };
  return (
    <div className='animate__animated animate__fadeIn'>
  <Card>
    <Form onSubmit={expenseFormHandler}>

      <Row className="mb-3">
        <h3>Enter Transaction : </h3>
        <hr/>
        <Col md={6}>
          <div className={Expfclass.input_text}>
            <Form.Control
              type='text'
              ref={textRef}
              placeholder='expense name'
              required
            />
          </div>
        </Col>
        <Col md={6}>
          <Form.Select ref={typeRef} required>
            <option value=''>Type</option>
            <option value='income'>Income</option>
            <option value='expense'>Expense</option>
          </Form.Select>
        </Col>
      </Row>
      <br/>
      <div className={Expfclass.input_actions}>
        <div className={Expfclass.input_text}>
              <label>Category:</label>
          <Form.Select ref={categoryRef} placeholder='please select' required>
            <option value=''>Select a category</option>
            <option value='travel'>Travel</option>
            <option value='grocery'>Grocery</option>
            <option value='entertainment'>Entertainment</option>
            <option value='health'>Health</option>
            <option value='food'>Food</option>
            <option value='Bills'>Bills</option>
          </Form.Select>
        </div>
      </div>
      <br/>
      <div className={Expfclass.input_actions}>
        <div className={Expfclass.input_text}>
              <label>Amount : </label>
            </div>
          <Form.Control
            type='number'
            min='1'
            step='1'
            placeholder=" ex. - 2500"
            ref={amountRef}
            required
          />
      </div>
      <button 
      className={Expfclass.btn}>
            Add Transaction
          </button>
    </Form>
  </Card>
</div>
);
};

export default ExpenseForm;
