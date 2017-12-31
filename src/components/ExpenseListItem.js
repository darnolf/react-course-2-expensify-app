import React from 'react';
import moment from 'moment';
import numberal from 'numeral';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

const ExpenseListItem = ({id, description, amount, createdAt}) => (
    <div>
        <h3>{description}</h3>
        <Link to={`/edit/${id}`} >Edit</Link>
        <p>{numberal(amount / 100).format('$0,0.00')} - {moment(createdAt).format('MMM do, YYY')}</p>
    </div>
);

export default ExpenseListItem;

