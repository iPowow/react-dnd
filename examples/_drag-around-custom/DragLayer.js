'use strict';

var React = require('react'),
    ItemTypes = require('./ItemTypes'),
    BoxDragPreview = require('./BoxDragPreview'),
    { DragLayerMixin } = require('react-dnd');

var DragLayer = React.createClass({
  mixins: [DragLayerMixin],

  renderItem(type, item) {
    switch (type) {
    case ItemTypes.BOX:
      return (
        <BoxDragPreview title={item.title} />
      );
    }
  },

  render() {
    var {
      x,
      y,
      draggedItem,
      draggedItemType,
      isDragging
    } = this.state;

    if (this.props.snapToGrid) {
      x = Math.round(x / 32) * 32;
      y = Math.round(y / 32) * 32;
    }

    var transform;
    if (isDragging) {
      transform = `translate(${x}px, ${y}px)`;
    }

    return (
      <div style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 100,
        left: 0,
        top: 0,
        width:'100%',
        height: '100%'
      }}>
        {isDragging &&
          <div style={{
            transform: transform,
            WebkitTransform: transform,
          }}>
            {this.renderItem(draggedItemType, draggedItem)}
          </div>
        }
      </div>
    );
  }
});

module.exports = DragLayer;
