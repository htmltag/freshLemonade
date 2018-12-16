import React from "react";

import GetPrice from './GetPrice';

class GetLemonade extends React.Component {
  state = { dataKey: null };

  componentDidMount() { 
    const { drizzle } = this.props;
    const contract = drizzle.contracts.LemonadeAuction;

    // let drizzle know we want to watch the `myString` method
    const dataKey = contract.methods["getLemonade"].cacheCall(this.props.lemonadeid);

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  lemonadeView = lemonade => {
    let lem = [];
    let name = lemonade.value[0];
    let ingredients = lemonade.value[1];

    var ing = [],
    sNumber = ingredients.toString();

    for (var i = 0, len = sNumber.length; i < len; i += 1) {
      ing.push(+sNumber.charAt(i));
    }

    lem.push(<h3 className="lemonade-details-h3">{name} <span className="ingh3">ingCode: {ingredients}</span></h3>);

    //get the price 
    lem.push(<GetPrice lemonadeid={this.props.lemonadeid} drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} /> )
    if(ing.length === 1){
      lem.push(<p>Water: Tap <span className="water-percentage">{100 - (ing[0] * 10)}%</span></p>);
      lem.push(<p>Sugar: <span className="sugar-percentage">0%</span></p>);
      lem.push(<p>Lemon: <span className="lemon-percentage">{ing[0]}0%</span></p>);
    }else if(ing.length === 2) {
      lem.push(<p>Water: Tap <span className="water-percentage">{100 - ((ing[0] + ing[1]) * 10)}%</span></p>);
      lem.push(<p>Sugar: <span className="sugar-percentage">{ing[0]}0%</span></p>);
      lem.push(<p>Lemon: <span className="lemon-percentage">{ing[1]}0%</span></p>);
    }else if(ing.length === 3){
      if(ing[0] === 0){
        lem.push(<p>Water: Tap <span className="water-percentage">{100 - ((ing[1] + ing[2]) * 10)}%</span></p>);
      }else if(ing[0] === 1){
        lem.push(<p>Water: Bottle <span className="water-percentage">{100 - ((ing[1] + ing[2]) * 10)}%</span></p>);
      }else if(ing[0] === 2){
        lem.push(<p>Water: Spring <span className="water-percentage">{100 - ((ing[1] + ing[2]) * 10)}%</span></p>);
      }
      lem.push(<p>Sugar: <span className="sugar-percentage">{ing[1]}0%</span></p>);
      lem.push(<p>Lemon: <span className="lemon-percentage">{ing[2]}0%</span></p>);
    }
    return lem;

  }

  render() {
    // get the contract state from drizzleState
    const { LemonadeAuction } = this.props.drizzleState.contracts;

    if(!(this.state.dataKey in LemonadeAuction.getLemonade)) {
        return (
          <span>Loading...</span>
        )
      }

    // using the saved `dataKey`, get the variable we're interested in
    const lemonade = LemonadeAuction.getLemonade[this.state.dataKey];

    // if it exists, then we display its value
    return (
      <div className="lemonade-details">
      {this.lemonadeView(lemonade)}
      </div>
    );
  }
}

export default GetLemonade;