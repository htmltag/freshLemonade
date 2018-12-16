import React from "react";
import GetLemonade from "./GetLemonade";

class GetAllLemonades extends React.Component {
  state = { dataKey: null };

  componentDidMount() { 
    const { drizzle } = this.props;
    const contract = drizzle.contracts.LemonadeAuction;

    // let drizzle know we want to watch the `myString` method
    const dataKey = contract.methods["numberOfLemonades"].cacheCall();

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  createLemonadeList = lemonadeSize => {
    let list = [];

    for (let i = 0; i < lemonadeSize; i++){
      list.push(<div className="col-xs-12 col-sm-6 col-md-3"><GetLemonade lemonadeid={i} drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} /></div>);
    }
    return list;
  };

  render() {
    // get the contract state from drizzleState
    const { LemonadeAuction } = this.props.drizzleState.contracts;

    if(!(this.state.dataKey in LemonadeAuction.numberOfLemonades)) {
        return (
          <span>Loading...</span>
        )
    }

    // using the saved `dataKey`, get the variable we're interested in
    const size = LemonadeAuction.numberOfLemonades[this.state.dataKey].value;
    
    // if it exists, then we display its value
    return (
      <div className="row">
      {this.createLemonadeList(size)}
      </div>
    );
  }
}

export default GetAllLemonades;