import React, {useReducer, createContext } from "react";
import contextReducer from "./contextReducer";

const initialState = JSON.parse(localStorage.getItem('transactions')) || [{"amount":60,"category":"Travel","type":"Expense","date":"2021-09-26","id":"206873bf-fa64-4ce3-8138-d80f22dc8534"},{"amount":180,"category":"Salary","type":"Income","date":"2021-09-26","id":"eadfa1df-e61b-4a17-96b9-759c80994d48"},{"amount":200,"category":"Savings","type":"Income","date":"2021-09-26","id":"f6c6bee9-c53f-47d3-960c-ab9a7261bc78"},{"amount":20,"category":"Clothes","type":"Expense","date":"2021-09-26","id":"d65b3277-dc98-4cbf-b5b0-93d2fe69adf5"},{"amount":100,"category":"Extra income","type":"Income","date":"2021-09-26","id":"062f6f70-fdcc-4efe-8083-8c15375ad972"}];

export const ExpenseTrackerContext = createContext(initialState);

export default function Provider({ children }){
    const [transactions, dispatch] = useReducer(contextReducer, initialState);

    //Action Creators
    const deleteTransaction = (id) => {
        dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    }

    const addTransaction = (transaction) => {
        dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
    }

    const balance = transactions.reduce((acc, currVal) => {
        return (currVal.type === 'Expense' ? acc -= currVal.amount : acc += currVal.amount)
    }, 0);


    return (
        <ExpenseTrackerContext.Provider value={{
            deleteTransaction,
            addTransaction,
            transactions,
            balance
        }}>
            {children}
        </ExpenseTrackerContext.Provider>
    )
}