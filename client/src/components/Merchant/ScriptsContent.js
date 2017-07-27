import React, { Component } from 'react';
import { Container, Segment, Grid, Form, Header, Input, TextArea } from 'semantic-ui-react'
// import './style.css';

// const scripts = [{
//     name: 've',
//     properties: [{
//         name: 'journeyCode',
//         type: 'text'
//     }]
// },{
//     name: 'ttd',
//     properties: [{
//         name: 'config',
//         type: 'textarea'
//     }]
// }];

class ScriptsContent extends Component {

	render() {
        const props = this.props;
		
		const veJourneyCode = props.merchant.veEnabled ?
		<div> <Input placeholder='Enter tag js' type='text' name='veJourneycode' value={props.merchant.veJourneycode} onChange={props.handleInputChange} />
				 </div> 
		: null;
		
		const contentTtd = props.merchant.ttdEnabled ? 
		<div> <TextArea placeholder='Past your TTD code here' name="ttdConfig" rows="10" cols="100" value={props.merchant.ttdConfig} onChange={props.handleInputChange} />
				 </div> 
		: null;

		return (
  		<div>
  		<Container>
  			<Segment>
                {/* {scripts.map((script, index) => {
                    return (
                        <div key={script.name}>
                            <label>{script.name}</label>
                            <input type='checkbox' name={script.name+'_enabled'} checked={this.state.veEnabled} onChange={props.handleInputChange} />
                            {script.properties.map( (property, jIndex) => {
                                const propertyName = script.name + '_' + property.name;
                                return <input key={propertyName} type='text' name={propertyName} value={this.state.veJourneycode} onChange={props.handleInputChange} />
                                })
                            }
                        </div>
                    )
                })} */}
				<div>
					<Grid>
					    <Grid.Row>
					        <Grid.Column width={2}>
    							<Header as='h4'>Ve
									<Header.Subheader>
					        			<input type='checkbox' name='veEnabled' checked={props.merchant.veEnabled} onChange={props.handleInputChange} />
									</Header.Subheader>
								</Header>
					        </Grid.Column>
					        <Grid.Column width={12}>
	      						{ veJourneyCode }
					        </Grid.Column>
					    </Grid.Row>
				    </Grid>
				</div>
				<br />
				<div>
					<Grid>
					    <Grid.Row>
					        <Grid.Column width={2}>
    							<Header as='h4'>TTD
									<Header.Subheader>
					        			<input type="checkbox" name="ttdEnabled" checked={props.merchant.ttdEnabled} onChange={props.handleInputChange} />
									</Header.Subheader>
								</Header>
					        </Grid.Column>
					        <Grid.Column width={12}>
	      						{ contentTtd }
					        </Grid.Column>
					    </Grid.Row>
				    </Grid>
				</div>
				<br />
				<div>
					<Header as='h4'>Content
						<Header.Subheader>
							<Form.TextArea placeholder='Past your JS code here'  type='text' name='script' rows="10" cols="100" value={props.merchant.script} onChange={props.handleInputChange}/>
						</Header.Subheader>
					</Header>
				</div>
			</Segment>
		</Container>
		</div>
		);
	}
}

export default ScriptsContent;
