import React from "react";
import BidOnLemonade from "./BidOnLemonade";

class GetPrice extends React.Component {
  state = { dataKey: null };

  componentDidMount() { 
    const { drizzle } = this.props;
    const contract = drizzle.contracts.LemonadeAuction;

    // let drizzle know we want to watch the `myString` method
    const dataKey = contract.methods["lemonadeIdToAuction"].cacheCall(this.props.lemonadeid);

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  priceView = auction => {
    let view = [];
    if(auction === undefined){
        view.push(<p>Price: <span className="nfs">Not for sale</span></p>)
        return view;
    }
    let address = auction.value[0];
    let price = auction.value[1];

    if(price <= 0 ){
        view.push(<p>Price: <span className="nfs">Not for sale</span></p>)
    }else{
        view.push(<p>Price: <span>{price}</span> {<BidOnLemonade lemonadeid={this.props.lemonadeid} price={price} drizzle={this.props.drizzle} drizzleState={this.props.drizzleState}/>}</p>)
    }
    
    return view;

  }

  render() {
    // get the contract state from drizzleState
    const { LemonadeAuction } = this.props.drizzleState.contracts;

    if(!(this.state.dataKey in LemonadeAuction.lemonadeIdToAuction)) {
        return (
          <span>Loading...</span>
        )
      }

    // using the saved `dataKey`, get the variable we're interested in
    const auction = LemonadeAuction.lemonadeIdToAuction[this.state.dataKey];

    // if it exists, then we display its value
    return (
      <div className="lemonade-details">
      {this.priceView(auction)}
      </div>
    );
  }
}

export default GetPrice;