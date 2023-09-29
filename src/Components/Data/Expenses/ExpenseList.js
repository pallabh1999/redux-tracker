import React from 'react';
import 'animate.css';
import ExpLisCSS from './ExpenseList.module.css';
import ExpenseListCard from './UI/ExpenseListCard';
import FileSaver from 'file-saver';
import { FaDownload } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { removeExpense,editHandler} from '../../Store/ExpenseAction';

const ExpenseList = () => {
    const dispatch = useDispatch();
	const expenses = useSelector((state)=> state.expense.expenses)
	const premium = useSelector((state)=> state.userInfo.premium)
	
	
	  let content;
	if (expenses.length === 0) {
		// content = (
			return(
			<div className={ExpLisCSS.norecord_wrapper}>
				<h3>No transaction recorded </h3>
			</div>
		);
	} else {
		content = expenses.map(exp => {
			const cssexpensetype = exp.expense_type;
			const updatedcsstype = cssexpensetype.toLowerCase();
			return (
				<li key={exp.id}>
					<div
						className={`${ExpLisCSS.list_wrapper__point} ${updatedcsstype === 'expense' ? ExpLisCSS.expense : ExpLisCSS.income} animate__animated animate__fadeIn `}
					>
						<p>{exp.text} - {exp.amount}Rs/-</p>
						<button onClick={() => dispatch(removeExpense(exp.id))} 
						className={ExpLisCSS.btn}>Delete
							</button>
						<button onClick={() =>  
							dispatch(editHandler(exp.id))
							 } className={ExpLisCSS.btn}>Edit</button>
					</div>
				</li>
			)
		})
	}
	const downloadData=()=>{
        const data='Type, Amount, category, text \n'+expenses.map(({category,amount,expense_type,text})=>(
            `${expense_type} - ${amount}Rs/-  - ${category} - ${text}`
        )).join('\n')
       const expenseData =new Blob([data],{ type: 'text/csv;charset=utf-8;' })
        FileSaver.saveAs(expenseData, 'expense.csv');
    }


	return (
		<div className={`${ExpLisCSS[ 'expenselist_wrapper' ]} animate__animated animate__fadeInUp animate__delay-0.6s`}>
			<ExpenseListCard>
				<h2>History</h2>
				<div>
				{ premium && <button className={ExpLisCSS.downloadButton} onClick={downloadData}><FaDownload/>Get Data</button>}
				</div>
				<ul className={ExpLisCSS[ 'list_wrapper' ]}>
					{content}
				</ul>
			</ExpenseListCard>
		</div>
	);
};

export default ExpenseList;
