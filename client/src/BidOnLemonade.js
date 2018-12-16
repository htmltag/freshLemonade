import React from "react";

class BidOnLemonade extends React.Component {
  state = { stackId: null };

  makeBid = () => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.LemonadeAuction;

    // let drizzle know we want to watch the `myString` method
    const stackId = contract.methods["bid"].cacheSend(this.props.lemonadeid, {
        from: drizzleState.accounts[0]
      });

    // save the `stackId` to local component state for later reference
    this.setState({ stackId });
  }

  getTxStatus = () => {
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = this.props.drizzleState;

    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[this.state.stackId];

    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;

    // otherwise, return the transaction status
    return `Transaction status: ${transactions[txHash].status}`;
  };

  render() {
    return (
        <span>
        <button type="button" class="btn btn-primary btn-sm" onClick={this.makeBid}>Buy</button>
        <span>{this.getTxStatus()}</span>
        </span>
      );
  }
}

export default BidOnLemonade;