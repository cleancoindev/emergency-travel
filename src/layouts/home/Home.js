import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import logo from '../../logo.png'

class Home extends Component {
  
  render() {
    console.log(this.props);
    return (
      <main className="container">
       <div className="outerBox">
       <div className="titleBox">EMERGENCY TRAVEL</div>
       <div className="account-data">ACCOUNT FUNDS: <AccountData accountIndex="0" units="ether" precision="3" /></div>
       Hotels Length: <ContractData contract="WTIndex" method="getHotelsLength" />
      Hotel Addresses: <ContractData contract="WTIndex" method="getHotels"/>
        </div>
      </main>
    )
  }
}

export default Home
