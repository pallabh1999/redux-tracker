import expenseClass from './Expense.module.css';
import { UseSelector } from 'react-redux/es/hooks/useSelector';
import ExpenseForm from './ExpenseForm';
import ExpenseResults from './ExpenseResults'

const Expense = () => {

	return (
		<div className={expenseClass.expense_div}>
            <ExpenseForm />
            <ExpenseResults />
		</div>
	);
};

export default Expense;