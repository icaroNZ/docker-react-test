import React, { Component } from 'react';
import axios from 'axios';
class Fib extends Component {
  state = {
    seemIndexes: [],
    values: {},
    index: ''
  };

  async fetchIndexes() {
    const indexes = await axios.get('/api/values/all');
    this.setState({
      seemIndexes: indexes.data
    });
  }

  async fetchValues() {
    const values = await axios.get('/api/values/current');
    this.setState({
      values: values.data
    });
  }

  renderSeenIndexes() {
    return this.state.seemIndexes.map((number) => number).join(', ');
  }

  renderValues() {
    const entries = [];
    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculate {this.state.values[key]}
        </div>
      );
    }
    return entries;
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post('api/values', {
      index: this.state.index
    });
    this.setState({ index: '' });
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input
            value={this.state.index}
            onChange={(event) => this.setState({ index: event.target.value })}
          />
          <button>Submit</button>
        </form>
        <h3>Indexes I have seem:</h3>
        {this.renderSeenIndexes}
        <h3>Calculate values</h3>
        {this.renderValues}
      </div>
    );
  }
}

export default Fib;
