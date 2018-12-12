import React from "react";

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

    lem.push(<h3>{name} (ingCode: {ingredients})</h3>);

    if(ing.length === 1){
      lem.push(<p>Water: Tap</p>);
      lem.push(<p>Sugar: 0/10</p>);
      lem.push(<p>Lemon: {ing[0]}/10</p>);
    }else if(ing.length === 2) {
      lem.push(<p>Water: Tap</p>);
      lem.push(<p>Sugar: {ing[0]}/10</p>);
      lem.push(<p>Lemon: {ing[1]}/10</p>);
    }else if(ing.length === 3){
      if(ing[0] === 0){
        lem.push(<p>Water: Tap</p>);
      }else if(ing[0] === 1){
        lem.push(<p>Water: Bottle</p>);
      }else if(ing[0] === 2){
        lem.push(<p>Water: Spring</p>);
      }
      lem.push(<p>Water: Tap</p>);
      lem.push(<p>Sugar: {ing[1]}/10</p>);
      lem.push(<p>Lemon: {ing[2]}/10</p>);
    }

    return lem;

  }

  render() {

    console.log("state: " + this.props.drizzleState);
    if (this.props.drizzleState === undefined) {
        return (
            <span>Loading...</span>
        )
      }

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
      this.lemonadeView(lemonade)
    );
  }
}

export default GetLemonade;