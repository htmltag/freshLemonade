import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GetAllLemonades from "./GetAllLemonades";
import AddLemonade from './AddLemonade';
import PutLemonadeForSale from './PutLemonadeForSale';

class App extends Component {
  state = { loading: true, drizzleState: null };

  componentDidMount() {
    const { drizzle } = this.props;

    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {

      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  compomentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (this.state.loading) return "Loading Drizzle...";
    return (
      <div className="App">
      <div className="App-header"><h1><span className="App-freshheader">Fresh</span> <span className="App-lemonheader">Lemonade</span></h1></div>
      <div className="App-container">
      <AddLemonade 
      drizzle={this.props.drizzle}
      drizzleState={this.state.drizzleState}
      />
      <PutLemonadeForSale 
      drizzle={this.props.drizzle}
      drizzleState={this.state.drizzleState}
      />
        {<GetAllLemonades
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />}
      </div>
      
      </div>
    );
  }

}
export default App;
