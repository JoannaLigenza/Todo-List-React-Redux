import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/tasksArea.css';
import './css/menuArea.css';
import './css/addTask.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer.js';
import { loadState, saveState } from './localStorage.js';

// Read from storage
const persistedState = loadState();

// Create store
const store = createStore(rootReducer, persistedState); 

// store.subscribe - this is a listener, which saves store in storage every time the state is changed
store.subscribe( () => {
    //saveState(store.getState())
    saveState( {
         tasks: store.getState().tasks , 
         id: store.getState().id , 
         lists: store.getState().lists , 
         notes: store.getState().notes ,
    } );
})

console.log("store ", store.getState())

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
