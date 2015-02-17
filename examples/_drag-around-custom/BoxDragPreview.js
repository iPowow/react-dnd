'use strict';

var React = require('react'),
    ItemTypes = require('./ItemTypes'),
    getEmptyImage = require('./getEmptyImage'),
    Box = require('./Box'),
    { PropTypes } = React,
    { DragDropMixin, DropEffects } = require('react-dnd');

var styles = {
  boxDragPreview: (state) => ({
    backgroundColor: state.tickTock ? 'white' : 'yellow',
    display: 'inline-block',
    webkitTransform: 'rotate(-10deg)',
    transform: 'rotate(-10deg)'
  })
};

var BoxDragPreview = React.createClass({
  propTypes: {
    title: PropTypes.string.isRequired
  },

  getInitialState() {
    return {
      tickTock: false
    };
  },

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        tickTock: !this.state.tickTock
      });
    }, 500);
  },

  componentWillUnmount() {
    clearInterval(this.interval);
  },

  render() {
    var { title } = this.props;

    return (
      <div style={styles.boxDragPreview(this.state)}>
        <Box title={title} />
      </div>
    );
  }
});

module.exports = BoxDragPreview;
