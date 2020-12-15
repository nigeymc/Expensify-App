import uuid from 'uuid';
import database from '../firebase/firebase';

// ACTIONS

// ADD_EXPENSE

export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData;

        const expense = { description, note, amount, createdAt }

        return database.ref('expenses').push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};

// REMOVE_EXPENSE

export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

export const startRemoveExpense = ({ id }) => {
    return (dispatch) => {

        return database.ref(`expenses/${id}`)
            .remove()
            .then(() => {
                dispatch(removeExpense({ id }));
            });
    };
};

// EDIT_EXPENSE

export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// FETCH_EXPENSES
export const fetchExpenses = (expenses) => ({
    type: 'FETCH_EXPENSES',
    expenses
});

export const startFetchExpenses = () => {
    return (dispatch) => {
        return database.ref('expenses')
            .once('value')
            .then((snapshot) => {
                const expenses = [];

                snapshot.forEach((childSnapshot) => {
                    expenses.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });

                dispatch(fetchExpenses(expenses));
            })
            .catch((e) => {
                console.log('Error fetching data', e);
            });
    };
};

// 1. Fetch all expense data once

// 2. Parse that data into an array

// 3. Dispatch SET_EXPENSES

// database.ref('expenses')
//     .once('value')
//     .then((snapshot) => {
//         const expenses = [];

//         snapshot.forEach((childSnapshot) => {
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             });
//         });

//         console.log(expenses);
//     });