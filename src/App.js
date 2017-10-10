import React, {Component} from 'react';

import './App.css';

import InteractiveEmployeeList from './container/InteractiveEmployeeList';


import  {Provider} from 'react-redux';
import rootReducer from './reducer/rootReducer';
import {createStore} from 'redux'

let store = createStore(rootReducer);

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


