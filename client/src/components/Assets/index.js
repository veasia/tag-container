import React, { Component } from 'react';
import Buttons from './Buttons.js';
import Inputs from './Inputs.js';
import { Segment, Grid } from 'semantic-ui-react'



class Assets extends Component {
	render() {
    	return (

    	<div>	
			<Grid>
				<Grid.Row>
					<Grid.Column width={4}>
						<Segment>
		    				<Buttons/>
					    </Segment>
					</Grid.Column>
					<Grid.Column width={4}>
						<Segment>
		    				<Inputs/>
					    </Segment>
					</Grid.Column>
				</Grid.Row>
			</Grid>
    	</div>
    	)
	}	
}
export default Assets;