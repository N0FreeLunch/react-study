import React, {Component} from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number : 0,
      fixedNumber1 : 0
     };
  }
  render() {
    // const { number, fixedNumber1 } = this.state;
    return (
      <div>
      <h1>{this.state.number}</h1>
      <h2>바뀌지 않는 값 : {this.state.fixedNumber1}</h2>
      <button
        onClick={() => {
          this.state = { number : this.state.number + 1}
          this.state = { number : this.state.number + 1}
          console.log(this.state);
          // this.setState({ number : this.state.number + 1});

        }}
      >
      +1
      </button>

      <button
        onClick={() => {
          // this.state = { number : this.state.number + 1}
          console.log(this.state);
          this.state = { number : this.state.number + 1};
          this.setState({ number : this.state.number + 1});
        }}
      >
      +1
      </button>

      </div>
    )
  }
}

export default Counter;
