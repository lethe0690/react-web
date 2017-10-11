import React, {Component} from 'react';

import './App.css';

import InteractiveEmployeeList from './container/InteractiveEmployeeList';


import  {Provider} from 'react-redux';
import rootReducer from './reducer/rootReducer';
import {emInit} from './reducer/employeeListReducer'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';

let store = createStore(rootReducer, applyMiddleware(thunk));

store.dispatch(emInit());

class App extends Component {
    render() {
        return (
            <div>
                <Provider store={store}>
                    <InteractiveEmployeeList/>
                </Provider>
            </div>
        );
    }
}

export default App;


