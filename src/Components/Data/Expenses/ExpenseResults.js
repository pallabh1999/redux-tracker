import React, {  useEffect, useState } from 'react';
import 'animate.css';
import Card from './UI/Card';
import ExpResclass from './ExpenseResults.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { userAction } from '../../Store/UserSlice';
const ExpenseResults = () => {
	const [ results, setResults ] = useState({})
	const [premium , setPremium] =useState(false);
	const expenses = useSelector((state) => state.expense.expenses)
	const isPremium = useSelector((state) => state.userInfo.premium)
  const dispatch = useDispatch();


	const resultsdata = () => {
		let incomedata =  expenses.filter((exp) => exp.expense_type === 'income').map((data) => data.amount)
		let expensedata = expenses.filter((exp) => exp.expense_type === 'expense').map((data) => data.amount)
     
		let income = incomedata.reduce((accumlator, currentValue) => parseInt(accumlator) + parseInt(currentValue), 0)
		let expense = expensedata.reduce((accumlator, currentValue) => parseInt(accumlator) + parseInt(currentValue), 0)


		let total = income - (-expense);

		if(total >= 10000 && !isPremium){
			setPremium(true);
		}

		setResults({ income, expense, total });
	}

 const premiumBuyHandler =()=>{
	alert('premium package purchased successfully')
	 dispatch(userAction.setPremium())
	setPremium(false);
 }

	useEffect(() => {
		resultsdata();
	}, [ expenses ])

	return (
		<div className='animate__animated animate__fadeIn'>
			<Card resultclass={true}>
				<div className={ExpResclass.results_wrapper}>
					<div className={ExpResclass.income_div}>
						<h3>INCOME:</h3>
						<h3>{results.income}</h3>
					</div>

					<div className={ExpResclass.income_div}>
						<h3>EXPENSE:</h3>
						<h3 className={ExpResclass.expense}>
							{results.expense}
						</h3>
					</div>

					<div className={ExpResclass.result_div}>
						<h3>Total Amount:</h3>
						<h3>{results.total}</h3>
					</div>
					{premium && 
					<button  className="btn btn-danger"  onClick={premiumBuyHandler}>Buy premium</button>}
				</div>
			</Card>
		</div>
	);
};

export default ExpenseResults;