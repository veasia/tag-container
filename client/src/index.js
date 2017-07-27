import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'

import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import DevTools from './components/DevTools';
import './index.css';

import Routes from './components/Routes';
import Header from './components/Header';
import Footer from './components/Footer';

import { Container, Segment} from 'semantic-ui-react'


const store = configureStore()
window.STORE = store;
render(
	<Provider store={store}>
		<Router>
			<div className='body'>
				<Header/>   
				<Container>
				<Segment color='blue' secondary>
					<Routes/>
				</Segment>
				<Footer/>
				</Container>
		    </div>
		</Router>
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();


