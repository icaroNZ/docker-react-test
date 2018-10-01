import React, { Component } from 'react';
import axios from 'axios';
class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ''
  };

  async fetchIndexes() {
    console.log('/api/values/all');
    const indexes = await axios.get('/api/values/all');
    this.setState({
      seenIndexes: indexes.data
    });
  }

  async fetchValues() {
    console.log('/api/values/current');
    const values = await axios.get('/api/values/current');
    this.setState({
      values: values.data
    });
  }

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({ number }) => number).join(', ');
  }

  renderValues() {
    const entries = [];
    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[key]}
        </div>
      );
    }
    return entries;
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    console.log('/api/values', this.state.index);
    await axios.post('/api/values', {
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
        {this.renderSeenIndexes()}
        <h3>Calculate values</h3>
        {this.renderValues()}
      </div>
    );
  }
}

export default Fib;
