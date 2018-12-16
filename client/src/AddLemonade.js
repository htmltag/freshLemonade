import React from "react";

class AddLemonade extends React.Component {
  state = { stackId: null, nameLem: null, ing: null, show: false };
  
  setShow = () => {
    const willShow = this.state.show ? false : true; 
    this.setState({show: willShow});
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log("value: " + value + " name: " + name);
    this.setState({
      [name]: value
    });
    
  };

  handleSubmit = event => {
    event.preventDefault();     
    alert('Lemonade name is: ' + this.state.nameLem);
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.LemonadeAuction;

    // let drizzle know we want to watch the `myString` method
    const stackId = contract.methods["mint"].cacheSend(this.state.nameLem, this.state.ing, {
        from: drizzleState.accounts[0]
      });

    // save the `stackId` to local component state for later reference
    this.setState({ stackId });
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
            <button type="button" className="btn btn-outline-info bt-sm" onClick={this.setShow}>Add Lemonade</button>
        )
      }else{
        return (
            <form className="owneronly" onSubmit={this.handleSubmit}>
            <button type="button" className="btn btn-outline-info bt-sm" onClick={this.setShow}>Hide Add Lemonade</button>
            <p>Only for owner</p>
            <label>
              Name:
              <input
                name="nameLem"
                type="text"
                value={this.state.nameLem}
                onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              Ingredients   :
              <input
                name="ing"
                type="number"
                value={this.state.ing}
                onChange={this.handleInputChange} />
            </label>
            <br />
            <input type="submit" type="button" className="btn btn-primary btn-sm" value="Add Lemonade" />
            <span>{this.getTxStatus()}</span>
          </form>
          );
      }
  }
}

export default AddLemonade;