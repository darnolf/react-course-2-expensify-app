import { createStore} from 'redux';

// Destructuring arguments passed to a function

const add = (data) => {
    return data.a + data.b;
}

console.log(add({a: 1, b: 12}));

const add2 = ({a,b} ) => {
    return a + b
}

console.log(add2({a: 1, b: 12}));


const add3 = ({ a , b} , c) => {
    return a + b + c;
}

console.log(add3({a: 1, b: 12}, 100));

// ACTION GENERATORS

const incrementCount = ({ incrementBy = 1} = {}) => ({  // ={} , arg need an object or break,  = 1 default value
    type: 'INCREMENT',
    incrementBy // incrementBy: incrementBy
})

const decrementCount = ({decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy
})

const setCount = ({count}) => ({
    type: 'SET',
    count
})

const resetCount = () => ({
    type: 'RESET',
})

// REDUCER

const countReducer = (state = {count: 0}, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
            case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            };
            case 'SET':
            return {
                count: action.count
            };            
            case 'RESET':
            return {
                count: 0
            };            
            default: 
            return state; 
    }
}


const store = createStore(countReducer);

const unsuscribe = store.subscribe(() => {
    console.log(store.getState())
})
//unsuscribe();

store.dispatch(incrementCount({incrementBy: 5}));

store.dispatch(incrementCount());

store.dispatch(resetCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount({decrementBy: 10}));

store.dispatch(setCount({count: 101}));

const name = ({} = {}) => ({
    
});

const name = ({args} = {}) => ({

});





