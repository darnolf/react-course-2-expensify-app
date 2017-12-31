// Expenses Reducer

const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [...state, action.expense]; // SPREAD OPERATOR
        case 'REMOVE_EXPENSE':
//      return state.filter((item) => item.id !== action.id) below, destructured argument
        return state.filter(({id}) => id !== action.id) //arr.filter((val) => val !== 4)

        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id){
                    return {
                        ...expense, 
                        ...action.updates
                    }
                } else {
                    return expense;
                }
            })
        default:
            return state;
    }
};

