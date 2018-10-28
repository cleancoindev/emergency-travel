import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DonateButtonContainer from "../requestComponents/donateButton/DonateButtonContainer";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";

const styles = {
  card: {
    //  maxWidth: 345,
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: "cover"
  }
};

class SingleRequest extends Component {
  constructor(props, context) {
    super(props, context);
    this.contracts = context.drizzle.contracts;
    this.web3 = context.drizzle.web3;
    this.state = {
      donationBalance: 0,
      percentFinished: 0,
      ipfsURI: {}
    };
  }

  //const { classes, donationAddress, donationRequired} = this.props;

  getBalance = async () => {
    const balance = await this.context.drizzle.web3.eth.getBalance(
      this.props.donationAddress
    );
   
    let donationBalance = await this.context.drizzle.web3.utils.fromWei(
      balance
    );
    

    let percentFinished = Math.floor(
      (donationBalance / this.props.donationRequired) * 100
    );
    
    this.setState({ donationBalance, percentFinished });
  };

  getUriDataFromContract = async () => {
    try {
      const index = await this.contracts.WTIndex.methods.hotelsIndex(this.props.donationAddress).call();
      const uri = await this.contracts.WTIndex.methods.HotelList(index-1).call();
      console.log("The URI info", uri);
      this.getUriDataFromIpfs(uri.ContractURI);
    } catch (error) {
      console.log(error)
    }
  }

  getUriDataFromIpfs = async (
    uri = "QmcLwV3zavxkqxuJjKN93pfQmnb67bL1ei14YHdnzqyGoT"
  ) => {
    const ipfsLink = "https://ipfs.io/ipfs/" + uri;
    

    try {
      const dataObject = await axios.get(ipfsLink);
      this.setState({ ipfsURI: dataObject.data });
      //console.log("The state now:", this.state.ipfsURI);
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getBalance();
    this.getUriDataFromContract();
  }

  render() {
    let fullName = "Loading...";
    let numberOfPeople = "Loading...";
    let personalStory = "Loading...";

    if (this.state.ipfsURI.Story) {
      //{fullName, numberOfPeople, personalStory} = this.state.ipfsURI.Story;
      fullName = this.state.ipfsURI.Story.fullName;
      numberOfPeople = this.state.ipfsURI.Story.numberOfPeople;
      personalStory = this.state.ipfsURI.Story.personalStory;

     
    }
    return (
      <Card className={this.props.classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Alan Kurdi"
            className={this.props.classes.media}
            height="340"
            image="https://www.nexofin.com/archivos/2015/09/sirios.jpg"
            title="Kurdi Familly"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {fullName}
              <div className="donationRequested">
                $ {this.props.donationRequired} USD
              </div>
              Amount Raised: {this.state.donationBalance}
              <Progress percent={this.state.percentFinished} />
            </Typography>
            <div className="donationAddress">
              Donation Address:{" "}
              <a
                href={
                  "https://blockscout.com/poa/dai/address/" +
                  this.props.donationAddress
                }
              >
                {this.props.donationAddress}
              </a>
            </div>

            <Typography component="p">
              {personalStory}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <DonateButtonContainer donationAddress={this.props.donationAddress} />
          Amount Donated:
        </CardActions>
      </Card>
    );
  }
}

SingleRequest.contextTypes = {
  drizzle: PropTypes.object
};

SingleRequest.propTypes = {
  shelter: PropTypes.object.isRequired,
  WTIndex: PropTypes.obj,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SingleRequest);
