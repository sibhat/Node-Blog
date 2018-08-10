import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers';

const REDUX_DEVTOOL= window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(rootReducer, REDUX_DEVTOOL, applyMiddleware (reduxThunk ))

ReactDOM.render(<Provider store={store}>
                    <BrowserRouter>
                        <App /> 
                    </BrowserRouter>
                </Provider>, document.getElementById('root'));
