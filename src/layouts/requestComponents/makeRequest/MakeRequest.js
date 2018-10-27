import React, { Component } from "react";
import ipfs from "../../home/ipfs/ipfs";
import { Button } from 'reactstrap';

import PropTypes from "prop-types";

class MakeRequest extends Component {
  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
    this.web3 = context.drizzle.web3;
    this.state = {
      ipfsHash: null,
      buffer: "",
      ethAddress: "",
      transactionHash: "",
      txReceipt: ""
    };
  }

  //Take file input from user
  captureFile = event => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => this.convertToBuffer(reader);
    
  };

  //Convert the file to buffer to store on IPFS
  convertToBuffer = async reader => {
    //file is converted to a buffer for upload to IPFS
    const buffer = await Buffer.from(reader.result);
    //set this buffer-using es6 syntax
    this.setState({ buffer });
  };

  //ES6 async function
  onClick = async () => {
    try {
      this.setState({ blockNumber: "waiting.." });
      this.setState({ gasUsed: "waiting..." });
      await this.web3.eth.getTransactionReceipt(
        this.state.transactionHash,
        (err, txReceipt) => {
          console.log(err, txReceipt);
          this.setState({ txReceipt });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  onSubmit = async event => {
    event.preventDefault();

    //save document to IPFS,return its hash#, and set hash# to state
    await ipfs.add(this.state.buffer, (err, ipfsHash) => {
      console.log(err, ipfsHash);
      //setState by setting ipfsHash to ipfsHash[0].hash
      this.setState({ ipfsHash: ipfsHash[0].hash });
      console.log("The IPFS HASH IS", ipfsHash);
    });
  };

  onSubmitForm = async event => {
    event.preventDefault();

    //save document to IPFS,return its hash#, and set hash# to state
    await ipfs.add(this.state.buffer, (err, ipfsHash) => {
      console.log(err, ipfsHash);
      //setState by setting ipfsHash to ipfsHash[0].hash
      this.setState({ ipfsHash: ipfsHash[0].hash });
      console.log("The IPFS HASH IS", ipfsHash);
    });
  };

  render() {
    return (
      <div>
        <div>Upload to IPFS Request</div>

        <h3> Upload Photo:  </h3>
        <form onSubmit={this.onSubmit}>
          <input type="file" onChange={this.captureFile} />
          <Button bsStyle="primary" type="submit">
            UpLoad
          </Button>
        </form>

        Image Location: {this.state.ipfsHash}

        {/* <form onSubmit={this.onSubmit2}>
        <input type="file" onChange={this}
        </form> */}

        Powered by <a href="https://windingtree.com/">Winding Tree</a>.
      </div>
    );
  }
}

MakeRequest.contextTypes = {
  drizzle: PropTypes.object
};

MakeRequest.propTypes = {
  shelter: PropTypes.object.isRequired,
  WTIndex: PropTypes.obj
};

export default MakeRequest;
