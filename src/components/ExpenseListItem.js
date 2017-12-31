import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

const ExpenseListItem = ({id, description, amount, createdAt}) => (
    <div>
        <h3>{description}</h3>
        <Link to={`/edit/${id}`} >Edit</Link>
        <p>{amount} - {createdAt}</p>
    </div>
);

export default ExpenseListItem;

