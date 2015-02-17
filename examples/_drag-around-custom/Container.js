'use strict';

var React = require('react'),
    update = require('react/lib/update'),
    ItemTypes = require('./ItemTypes'),
    DraggableBox = require('./DraggableBox'),
    { PropTypes } = React,
    { DragDropMixin, DragLayerMixin } = require('react-dnd'),
    DragDropStore = require('../../modules/stores/DragDropStore');

var styles = {
  container: {
   width: 300,
   height: 300,
   border: '1px solid black',
   position: 'relative'
  }
};

var Container = React.createClass({
  mixins: [DragDropMixin],

  getInitialState() {
    return {
      boxes: {
        'a': { top: 20, left: 80, title: 'Drag me around' },
        'b': { top: 180, left: 20, title: 'Drag me too' },
      }
    };
  },

  statics: {
    configureDragDrop(registerHandler, context) {
      registerHandler(ItemTypes.BOX, {
        dropTarget: {
          acceptDrop(component, item, e) {
            var startOffset = context.getDragStartOffsetFromClient(),
                lastOffset = context.getDragOffsetFromClient(),
                left = Math.round(item.left + lastOffset.x - startOffset.x),
                top = Math.round(item.top + lastOffset.y - startOffset.y);

            component.moveBox(item.id, left, top);
          }
        }
      });
    }
  },

  moveBox(id, left, top) {
    this.setState(update(this.state, {
      boxes: {
        [id]: {
          $merge: {
            left: left,
            top: top
          }
        }
      }
    }));
  },

  renderBox(item, key) {
    return (
      <DraggableBox key={key}
                    id={key}
                    left={item.left}
                    top={item.top}
                    title={item.title} />
    );
  },

  render() {
    var { boxes } = this.state;

    return (
      <div style={styles.container}
           {...this.dropTargetFor(ItemTypes.BOX)}>
        {Object
          .keys(boxes)
          .map(key => this.renderBox(boxes[key], key))
        }
      </div>
    );
  }
});

module.exports = Container;
