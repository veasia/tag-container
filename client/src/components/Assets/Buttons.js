import React from 'react'
import { Button, Header } from 'semantic-ui-react'

const Buttons = () => (
	<div>
		<Header as ="h2"> Buttons</Header>

		<Header as ="h4"> Button Validate / Save</Header>
	    <Button color='blue'>Blue</Button>

		<Header as ="h4"> Button Back</Header>
	    <Button color='grey'>Grey</Button>

		<Header as ="h4"> Button Ok</Header>
	    <Button color='green'>Green</Button>

		<Header as ="h4"> Button Discard/ Cancel</Header>
	    <Button negative>Red</Button>
    </div>
);

export default Buttons