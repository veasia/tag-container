import React from 'react';
import { Grid, Header } from 'semantic-ui-react'

const MerchantSelector = (props) => (
    <div>
        <Grid>
            <Grid.Row>
                <Grid.Column width={2}>
                    <Header as='h4'>Merchant Name</Header>    
                </Grid.Column>
                <Grid.Column width={12}>
                    {   
                        !props.editMode ?
                        <select onChange={props.handleMerchantSelected} value={props.merchant.merchantName} name='merchantName'>
                            <option value='0'>Select a Merchant</option>
                            {props.allMerchants.map(merchant => {
                                return <option value={JSON.stringify({id:merchant.id,name:merchant.name})} key={merchant.id}>{merchant.name}</option>
                            })}
                        </select>
                        : <input type='text' readOnly={props.newMode} name='merchantName' value={props.merchant.merchantName} onChange={props.handleInputChange} />
                    }  
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={2}>
                    <Header as='h4'>Merchant ID: </Header>    
                </Grid.Column>
                <Grid.Column width={12}>
                    <span>{props.merchant.merchantId}</span> <br />
                </Grid.Column>
                 
            </Grid.Row>
        </Grid>	
    </div>
)
export default MerchantSelector;

/*
<div>
        <Grid>
            <Grid.Row>
                <Grid.Column width={2}>
                    <Header as='h4'>Merchant Name</Header>
                </Grid.Column>
                <Grid.Column width={12}>
                    {   
                        !props.editMode ?
                        <select onChange={props.handleMerchantSelected} value={props.merchant.merchantName} name='merchantName'>
                            <option value='0'>Select a Merchant</option>
                            {merchants.map(merchant => {
                                return <option value={JSON.stringify({id:merchant.id,name:merchant.name})} key={merchant.id}>{merchant.name}</option>
                            })}
                        </select>
                        : <Input type='text' readOnly={props.newMode} name='merchantName' value={props.merchant.merchantName} onChange={props.handleInputChange} />
                    }       
                </Grid.Column>
            </Grid.Row>
        </Grid>
                
        <div>Merchant ID: <span>{props.merchant.merchantId}</span></div><span style={{fontSize:'10px'}}>The merchantId is temporarily the first valid string of the merchant Name</span>
    </div>

    */