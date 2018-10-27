import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

class DonateButton extends Component {
  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
    this.web3 = context.drizzle.web3;
    this.state = {};
  }

  componentDidMount() {
      console.log("Web3 in Donate Button", this.web3);
  }

  render() {
    const { classes } = this.props;
    
    return (
      <div>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Donate
        </Button>
      </div>
    );
  }
}

DonateButton.contextTypes = {
  drizzle: PropTypes.object
};

DonateButton.propTypes = {
  shelter: PropTypes.object.isRequired,
  WTIndex: PropTypes.obj
};

DonateButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DonateButton);
