import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Assets from '../Assets/';
import Merchant from '../Merchant/';
import NotFound from '../NotFound/';

const Routes = (props) => (
	<Switch>
		<Route exact path="/" render={() =>  (<div>HOME</div>)}/>
		<Route exact path="/merchant/new" component={() => (<Merchant editMode={true}/> )} />
		<Route exact path="/merchant/edit" component={() => (<Merchant editMode={false}/> )} />
		<Route exact path="/assets" component={Assets} />
		<Route component={NotFound} />
	</Switch>
);
export default Routes;
