import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Dropdown, Icon } from 'semantic-ui-react'

import logo_primary from './velogo_primary.png'


export default class MenuHeader extends Component {
  state = { activeItem: 'home' }


  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu stackable>
        <Menu.Item>
          <img src={logo_primary} alt="logo ve" />
        </Menu.Item>
        <Menu.Item
          as={Link}
          to='/'
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        >
          <Icon name='home' size='big' />HOME
        </Menu.Item>

        <Menu.Item as={Dropdown} text='Merchant' name='merchant' active={activeItem === 'merchant'}>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to='/merchant/new' onClick={(e) => this.handleItemClick(e,{name:'merchant'})}>
                <Icon name='add user' size='small' />New merchant
              </Dropdown.Item>
              <Dropdown.Item as={Link} to='/merchant/edit' onClick={(e) => this.handleItemClick(e,{name:'merchant'})}>
                <Icon name='edit' size='small' />Edit Merchant
              </Dropdown.Item>
            </Dropdown.Menu>
          </Menu.Item>

          {/* <Menu.Item as={Link} to='/assets'
            name='sign-in'
            active={activeItem === 'sign-in'}
            onClick={this.handleItemClick}
          >
            <Icon name='plus' size='big' />assets
        </Menu.Item> */}

          <Menu.Menu position='right'>
            <Menu.Item  to='/logout' onClick={(e) =>{console.log('redirect'); window.location.replace('/logout')}}>
              <Icon name='log out' size='big' />Log out
          </Menu.Item>
          </Menu.Menu>
      </Menu>
        )
  }
}