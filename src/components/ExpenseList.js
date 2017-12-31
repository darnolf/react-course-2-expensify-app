import React from 'react';
import { connect } from 'react-redux'
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

const ExpenseList = (props) => (
    <div>
       {props.expenses.map((expense) => {
           return <ExpenseListItem key={expense.id} {...expense} />
       })}
       


    </div>
);

// Most common method to connect redux:
 
const mapStateToProps = (state) => {
    return {
       // expenses: state.expenses,
       expenses: selectExpenses(state.expenses, state.filters) // filtered array from visibility filter
    }    
}

export default connect(mapStateToProps)(ExpenseList);

// Other practices

// export default connect((state) => {
//     return {
//         expenses: state.expenses
//     }
// })(ExpenseList);


// Full pattern, not used.
// const ConnectedExpenseList = connect((state) => {
//     return {
//         expenses: state.expenses
//     }
// })(ExpenseList);