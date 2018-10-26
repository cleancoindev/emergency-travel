import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import logo from '../../logo.png'

class Home extends Component {
  render() {
    return (
      <main className="container">
       <div className="outerBox">
       <div className="titleBox">EMERGENCY TRAVEL</div>
       <div className="account-data">ACCOUNT FUNDS: <AccountData accountIndex="0" units="ether" precision="3" /></div>
          
        </div>
      </main>
    )
  }
}

export default Home
