import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'

class Home extends Component {
  constructor(props, context) {
    super(props);
    // this.contracts = props.WTIndex;
    // this.web3 = context.drizzle.web3;
    this.state = {
      getHotelsLength: 0,
      dataKeys: [],
      hotels: [],
    };
    this.context = context;
  }

  componentDidMount() {
    console.log("This.wtindex", this.props.WTIndex);
    console.log("This.status", this.props.drizzleStatus);
    console.log("This.web3", this.props.web3);
    console.log("This.context", this.context);
 
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.WTIndex.initialized === false && this.props.WTIndex.initialized === true) {
      
     
        try {
          const requestCount = await this.props.WTIndex.methods.getHotelsLength();
          console.log("The request Count is: ", requestCount)
        } catch (error) {
          console.log(error)
        }
      

    }
  }


  
  render() {
    console.log(this.props);

    const getTravelReqests = async () => {
      console.log("Inside Get Travel Requests");
      try {
        const requestCount = await this.props.WTIndex.methods.getHotelsLength();
        console.log("The request Count is: ", requestCount)
      } catch (error) {
        console.log(error)
      }
    }

    getTravelReqests();

    return (
      <main className="container">
       <div className="outerBox">
       <div className="titleBox">EMERGENCY TRAVEL</div>
       <div className="account-data">ACCOUNT FUNDS: <AccountData accountIndex="0" units="ether" precision="3" /></div>
       Hotels Length: <ContractData contract="WTIndex" method="getHotelsLength" />
      Hotel Addresses: <ContractData contract="WTIndex" method="getHotels" />
        </div>
      </main>
    )
  }
}

export default Home
