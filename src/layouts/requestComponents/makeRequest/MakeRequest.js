import React, { Component } from "react";
import ipfs from "../../home/ipfs/ipfs";
import { Button } from "reactstrap";
import MakeRequestTextForm from "./MakeRequestTextForm";

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
      txReceipt: "",
      personalStory: {},
      completeHash: ""
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

  convertToBuffer = async reader => {
    //file is converted to a buffer for upload to IPFS
    const buffer = await Buffer.from(reader.result);
    //set this buffer-using es6 syntax
    this.setState({ buffer });
  };

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

  createFullJsonObjectAndSendToIPFS = async () => {
    let requestObject = JSON.stringify({
      photoURI: this.state.ipfsHash,
      requestInfo: JSON.stringify(this.state.personalStory)
    });

    try {
      const buffer = await Buffer.from(requestObject);
      const hash = await ipfs.add(buffer);
      console.log("This is the hash", hash);
    } catch (error) {
      console.log(error);
    }
  };

  ipfsImage = () => {
    let link = "https://ipfs.io/ipfs/" + this.state.ipfsHash;
    console.log("The link", link);
    return link;
  };

  setPersonalStoryAndSubmitToBlockchain = personalStory => {
    this.setState({ personalStory });
    console.log("Peraonsl story Set!", personalStory);
    this.createFullJsonObjectAndSendToIPFS();
  };

  render() {
    return (
      <div>
        <div>Upload to IPFS Request</div>
        <div className="uploadImageBox">
          {this.state.ipfsHash ? (
            <img className="uploadedImage" src={this.ipfsImage()} />
          ) : (
            <h3> Upload Photo: </h3>
          )}
        </div>
        <form onSubmit={this.onSubmit}>
          <input type="file" onChange={this.captureFile} />
          <Button bsStyle="primary" type="submit">
            UpLoad
          </Button>
        </form>
        <MakeRequestTextForm
          setPersonalStory={this.setPersonalStoryAndSubmitToBlockchain}
        />
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
