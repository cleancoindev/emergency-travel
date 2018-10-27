import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DonateButtonContainer from '../requestComponents/donateButton/DonateButtonContainer';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

const styles = {
  card: {
    //  maxWidth: 345,
     
     
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'cover',
  },
};

class SingleRequest extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      donationBalance: 0,
      percentFinished: 0,
    }
  }
  
  //const { classes, donationAddress, donationRequired} = this.props;

  getBalance = async () => {
    const balance = await this.context.drizzle.web3.eth.getBalance(this.props.donationAddress);
    //console.log("Balance is", context.drizzle.web3.utils.fromWei(balance));
    let donationBalance = await this.context.drizzle.web3.utils.fromWei(balance);
    console.log("Donation Balance: ", donationBalance);

    let percentFinished = Math.floor((donationBalance/this.props.donationRequired)*100);
    console.log("Percent Finished", percentFinished);
    this.setState({donationBalance, percentFinished});
    
   }

   
   componentDidMount() {

    this.getBalance();
   }

   render() {
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
            Kurdi Familly:  <div className="donationRequested">$ {this.props.donationRequired} USD</div>
            Amount Raised: {this.state.donationBalance}
            <Progress percent={this.state.percentFinished} />
          </Typography>
          <div className="donationAddress">Donation Address: {this.props.donationAddress}</div>
         
          <Typography component="p">
            3 years old Boy. Kurdish background escaping Syrian War. Attempting to reach Canada, first tried to sail from Bodrum in Turkey. Kurdi family paid $5,860 for their four spaces on the boat.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <DonateButtonContainer donationAddress={this.props.donationAddress}/>
        
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
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleRequest);