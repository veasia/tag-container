import React from 'react'
import { Header, Icon, Input } from 'semantic-ui-react'

const Inputs = () => (
	<div>
		<Header as ="h2"> Inputs</Header>

		<Header as ="h4"> Text input</Header>
			<Input placeholder='Search...' />

		<Header as ="h4"> Input loadingk</Header>
			<Input loading icon='user' placeholder='Search...' />

		<Header as ="h4"> Error</Header>
			<Input error placeholder='Search...' />


		<Header as ="h4"> With Icons</Header>
	    <Input icon placeholder='Search...'>
	      <input />
	      <Icon name='search' />
	    </Input>
	    <br />
	    <Input iconPosition='left' placeholder='Email'>
	      <Icon name='at' />
	      <input />
	    </Input>
    </div>
);

export default Inputs