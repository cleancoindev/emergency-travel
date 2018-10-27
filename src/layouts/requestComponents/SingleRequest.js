import React from 'react';
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

const styles = {
  card: {
     maxWidth: 345,
     
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'cover',
  },
};

function SingleRequest(props) {
  const { classes, donationAddress, donationRequired, web3, amountDonated = 0 } = props;

  function sendDonation(amount) {
    amount = amount //convert to wei;
    web3.eth.getAccounts(function(error, result) {
    web3.eth.sendTransaction(
        {from:web3.eth.accounts[0],
        to:"0x943",
        value:  amount, 
        data: "0xdf"
            }, function(err, transactionHash) {
      if (!err)
        console.log(transactionHash + " success"); 
    });
  });
}

 async function getBalance(){
  const balance = await web3.fromWei(web3.eth.getBalance(donationAddress));
  console.log("Balance is", balance);
 }

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Alan Kurdi"
          className={classes.media}
          height="340"
          image="https://www.nexofin.com/archivos/2015/09/sirios.jpg"
          title="Kurdi Familly"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Kurdi Familly: 
            Amount Donated: $-add later-
          </Typography>
          <div className="donationAddress">Donation Address: {donationAddress}</div>
          <div className="donationRequested">Donation Requested: {donationRequired} USD</div>
          <Typography component="p">
            3 years old Boy. Kurdish background escaping Syrian War. Attempting to reach Canada, first tried to sail from Bodrum in Turkey. Kurdi family paid $5,860 for their four spaces on the boat.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <DonateButtonContainer donationAddress={donationAddress}/>
        
          Amount Donated: 
        
      </CardActions>
    </Card>
  );

}

SingleRequest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleRequest);