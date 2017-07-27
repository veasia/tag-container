import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Response from './Response.js'
import MerchantSelector from './MerchantSelector.js'
import ScriptsContent from './ScriptsContent.js'
import {API_BASE_URL} from '../../constants'
// import './style.css';
import { Button } from 'semantic-ui-react'

class Merchant extends Component {
	constructor(props) {
        super(props);
        this.state = {
			merchant: {
				merchantId:'',
				merchantName:'',
				script:'',
				veEnabled:false,
				veJourneycode:'',
				ttdEnabled: false,
				ttdConfig:''
			},
			allMerchants: [],
			responseMessage:'',
			editMode: props.editMode,
			newMode: !props.editMode,
			isSaved: false
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleMerchantSelected = this.handleMerchantSelected.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;


		this.setState({
			...this.state, 
			isSaved: false,
			merchant: {
				...this.state.merchant,
				[name]: value
			}
		});
	}


	saveInDb(event) {
		//TODO: check that exists in the DB, if exists, return a message that can't be inserted
		//After created in the DB, call the setState
		var body = {
			"MerchantName": this.state.merchant.merchantName,
			"VeTagEnabled": this.state.merchant.veEnabled,
			"VeJourneyCode": this.state.merchant.veJourneycode,
			"TTDEnabled": this.state.merchant.ttdEnabled,
			"TTDParameters": this.state.merchant.ttdConfig,
			"CustomScript": this.state.merchant.script
		};
		var method = "POST";
		if(this.state.newMode){
			body.id = this.state.merchant.merchantId;
			method = "PUT";
		}

		axios({
			url: `${API_BASE_URL}/merchants/`,
			method: method,
			data: body
		})
		.then((response) => {
			if(response.data.merchants && response.data.merchants.id){
				let id = response.data.merchants.id;
				this.setState({
					...this.state,
					isSaved:true,
					responseMessage: `saved in DB.`,
					merchant:{
						...this.state.merchant,
						merchantId: id
					}
				});
			}
			else if(response.data.Error && response.data.Error.body){
				try{
					let body = JSON.parse(response.data.Error.body)
					this.setState({
						...this.state,
						responseMessage: `Error: ${body.code}`,
					});
				}
				catch(e){
					this.setState({
						...this.state,
						responseMessage: response.data.Error.body
					});
				}
			}
		});
	}

	handleMerchantSelected(event) {
		const value = event.target.value;
		//const merchantName = JSON.parse(value).name;
		const merchantId = JSON.parse(value).id;

		axios.get(`${API_BASE_URL}/merchants/${merchantId}`)
		.then((response) => {
			if(response.data.merchants){
				let res_merchant = response.data.merchants[0]
				this.setState({
					...this.state,
					merchant:{
						merchantName: res_merchant.MerchantName, 
						merchantId: res_merchant.id,
						veEnabled: res_merchant.VeTagEnabled,
						veJourneycode: res_merchant.VeJourneyCode,
						ttdEnabled: res_merchant.TTDEnabled,
						ttdConfig: res_merchant.TTDParameters,
						script: res_merchant.CustomScript
					}
				});
			}
			else if(response.Error && response.Error.body){
				try{
					let body = JSON.parse(response.Error.body)
					this.setState({
						...this.state,
						responseMessage: `Error: ${body.code}`,
					});
				}
				catch(e){
					this.setState({
						...this.state,
						responseMessage: `Error: unknown`,
					});
				}
			}
		});

		this.setState({
			...this.state,
			isSaved: false,
			editMode: true,
		});
	}

 	deployLive(event) {
		event.preventDefault();
		console.log(this.state.merchant)

		axios.post(`${API_BASE_URL}/deploy/live`, this.state.merchant)
		.then( (response) => {
			this.setState({
				responseMessage:response.data
			});
		})
		.catch ( error => {
			this.setState({
				responseMessage:`Error deploying: ${error}`
			});
		});
	}
	
	componentWillMount() {
    	axios.get(`${API_BASE_URL}/merchants/`)
		.then(response => {
			if(response.data.merchants){
				let merchants = response.data.merchants
				this.setState({
					...this.state,
					allMerchants: merchants.map((merchant) => { return {name: merchant.MerchantName, id: merchant.id}})
				});
			}
			else if(response.Error && response.Error.body){
				try{
					let body = JSON.parse(response.Error.body)
					this.setState({
						responseMessage: `Error: ${body.code}`,
					});
				}
				catch(e){
					this.setState({
						responseMessage: `Error: unknown`,
					});
				}
			}
		}).catch( error => {
			this.setState({
				responseMessage: `Error: unknown`,
			});
		})
  	}

	render() {
		console.log('on change ', this.state)

		return (
      		<form>
				<MerchantSelector newMode={this.state.newMode} editMode={this.state.editMode} merchant={this.state.merchant} allMerchants={this.state.allMerchants} handleInputChange={this.handleInputChange} handleMerchantSelected={this.handleMerchantSelected}/>
				{this.state.editMode && <ScriptsContent handleInputChange={this.handleInputChange} merchant={this.state.merchant}/> }
				<div> <br />
					<Button color='blue'  disabled={!this.state.merchant.merchantName || this.state.isSaved} type='button' onClick={(event) => this.saveInDb(event)}>Save</Button>
					<Button color='instagram'  disabled={!this.state.isSaved} type='button' onClick={(event) => this.deployLive(event)}>Deploy</Button>
				
				</div>
				<Response message={this.state.responseMessage}></Response>
			</form>
		);
	}
}

export default withRouter(Merchant);
