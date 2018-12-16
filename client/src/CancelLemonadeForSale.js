import React from "react";

class CancelLemonadeForSale extends React.Component {
  state = { dataKey: null, lemId: null, show: false };
  
  setShow = () => {
    const willShow = this.state.show ? false : true; 
    this.setState({show: willShow});
  };

  handleInputChangeCancel = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log("value: " + value + " name: " + name);
    this.setState({
      [name]: value
    });
    
  };

  handleSubmitCancel = event => {
    event.preventDefault();
    console.log("put it for sale");     
    const { drizzle } = this.props;
    const contract = drizzle.contracts.LemonadeAuction;

    // let drizzle know we want to watch the `myString` method
    const dataKey = contract.methods["cancel"].cacheSend(this.state.lemId);

    // save the `stackId` to local component state for later reference
    this.setState({ dataKey });
  };

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
      if(!this.state.show){
        return (
            <button type="button" className="btn btn-outline-info bt-sm" onClick={this.setShow}>Cancel lemonade for sale</button>
        )
      }else{
        return (
            <form className="owneronly" onSubmit={this.handleSubmitCancel}>
            <button type="button" className="btn btn-outline-info bt-sm" onClick={this.setShow}>Hide - Cancel lemonade for sale</button>
            <p>Only for owner</p>
            <label>
              LemonadeId:
              <input
                name="lemId"
                type="number"
                value={this.state.lemId}
                onChange={this.handleInputChangeCancel} />
            </label>
            <br />
            <input type="submit" className="btn btn-primary btn-sm" value="Cancel lemonade for sale" />
            <span>{this.getTxStatus()}</span>
          </form>
          );
      }
  }
}

export default CancelLemonadeForSale;