import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import ExpenseForm from './ExpenseForm';
import {editExpense, removeExpense} from '../actions/expenses'

const EditExpensePage = (props) => {
  return (
    <div>
      <h1>Edit Expense</h1>

      <ExpenseForm 
            expense={props.expense}
            onSubmit={(expense) => {
                props.dispatch(editExpense(props.match.params.id, expense));
                props.history.push('/');
            }}
        />
        <button onClick={() => {
           props.dispatch(removeExpense({id: props.expense.id})) // passed as object
           props.history.push('/');
        }}>Remove</button>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((expense) => expense.id == props.match.params.id),
  }
}

export default connect(mapStateToProps)(EditExpensePage);