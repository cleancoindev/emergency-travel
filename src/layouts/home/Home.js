import React, { Component } from "react";
import {
  AccountData,
  ContractData,
  ContractForm
} from "drizzle-react-components";
import PropTypes from "prop-types";

class Home extends Component {
  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
    this.web3 = context.drizzle.web3;
    this.state = {
      getHotelsLength: 0,
      dataKeys: [],
      requestCount: 0,
      requests: [],
      requestDetails: []
    };
  }

  componentDidMount() {
    console.log("This.wtindex", this.props.WTIndex);
    console.log("This.status", this.props.drizzleStatus);
    console.log("This.web3", this.props.web3);
    console.log("This.context", this.context);
    console.log("This.drizzle.contracts", this.contracts.WTIndex);
    this.getTravelReqestCount();
    this.getTravelRequests();
    this.getTravelRequestDetail();
  }

  async componentDidUpdate(prevProps) {
    if (
      prevProps.WTIndex.initialized === false &&
      this.props.WTIndex.initialized === true
    ) {
      console.log("Component did update!");
    }
  }

  getTravelReqestCount = async () => {
    //console.log("Inside Get Travel Requests", this.contracts.WTIndex);
    try {
      const requestCount = await this.contracts.WTIndex.methods
        .getHotelsLength()
        .call();
      console.log("The request Count is: ", requestCount);
      this.setState({ requestCount });
    } catch (error) {
      console.log(error);
    }
  };

  getTravelRequests = async () => {
    //console.log("Inside Get Travel Requests", this.contracts.WTIndex);
    try {
      const requests = await this.contracts.WTIndex.methods.getHotels().call();
      console.log("The travel request array: ", requests);
      this.setState({ requests });
    } catch (error) {
      console.log(error);
    }
  };

  getTravelRequestDetail = async num => {
    try {
      const requestDetail = await this.contracts.WTIndex.methods
        .getHotelByListIndex()
        .call();
      console.log("requestDetail", requestDetail);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <main className="container">
        <div className="outerBox">
          <div className="titleBox">EMERGENCY TRAVEL</div>
          <div className="account-data">
            ACCOUNT FUNDS:{" "}
            <AccountData accountIndex="0" units="ether" precision="3" />
          </div>
          Total Requests: {this.state.requestCount}
          Requests:
          <ol>
            {this.state.requests.map(req => (
              <li>{req}</li>
            ))}
          </ol>
        </div>
      </main>
    );
  }
}

Home.contextTypes = {
  drizzle: PropTypes.object
};

Home.propTypes = {
  shelter: PropTypes.object.isRequired,
  WTIndex: PropTypes.obj
};
export default Home;
