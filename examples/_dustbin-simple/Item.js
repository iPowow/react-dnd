'use strict';

var React = require('react'),
    ItemTypes = require('./ItemTypes'),
    { PropTypes } = React,
    { DragDropMixin } = require('react-dnd');

var Item = React.createClass({
  mixins: [DragDropMixin],

  propTypes: {
    name: PropTypes.string.isRequired
  },

  statics: {
    configureDragDrop(registerType) {
      registerType(ItemTypes.ITEM, {
        dragSource: {
          beginDrag(component) {
            setTimeout(component.props.onBeginDrag, 100);

            return {
              item: {
                name: component.props.name
              }
            };
          },

          endDrag(component, dropEffect) {
            window.alert('endDrag ' + dropEffect);
          }
        }
      });
    }
  },

  render() {
    var { isDragging } = this.getDragState(ItemTypes.ITEM);

    return (
      <div {...this.dragSourceFor(ItemTypes.ITEM)}
           style={{
             border: '1px dashed gray',
             backgroundColor: 'white',
             padding: '0.5rem',
             margin: '0.5rem',
             opacity: isDragging ? 0.4 : 1,
             maxWidth: 80
           }}>
        {this.props.name}
      </div>
    );
  }
});

module.exports = Item;
