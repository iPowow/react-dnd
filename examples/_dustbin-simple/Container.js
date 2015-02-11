'use strict';

var React = require('react'),
    Dustbin = require('./Dustbin'),
    Item = require('./Item');

var Container = React.createClass({
  getInitialState() {
    return {
      hideEm: false
    };
  },

  render() {
    return (
      <div>
        <Dustbin />
        {!this.state.hideEm &&
          <div style={{ marginTop: '2rem' }}>
            <Item name='Glass' onBeginDrag={this.handleBeginDrag} />
            <Item name='Banana' onBeginDrag={this.handleBeginDrag} />
            <Item name='Paper' onBeginDrag={this.handleBeginDrag} />
          </div>
        }
      </div>
    );
  },

  handleBeginDrag() {
    this.setState({
      hideEm: true
    });
  }
});

module.exports = Container;