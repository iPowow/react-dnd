'use strict';

var DragDropStore = require('../stores/DragDropStore');

var DragFeedbackMixin = {
  getInitialState() {
    return this.getStateFromDragDropStore();
  },

  getStateFromDragDropStore() {
    var dragStartOffsetFromContainer = DragDropStore.getDragStartOffsetFromContainer(),
        dragOffsetFromClient = DragDropStore.getDragOffsetFromClient(),
        draggedItemType = DragDropStore.getDraggedItemType(),
        isDragging = draggedItemType !== null;

    return {
      isDragging: isDragging,
      draggedItemType: draggedItemType,
      draggedItem: DragDropStore.getDraggedItem(),
      x: isDragging ? dragOffsetFromClient.x - dragStartOffsetFromContainer.x : undefined,
      y: isDragging ? dragOffsetFromClient.y - dragStartOffsetFromContainer.y : undefined
    };
  },

  handleDragDropStoreChange() {
    if (this.isMounted()) {
      this.setState(this.getStateFromDragDropStore());
    }
  },

  componentDidMount() {
    DragDropStore.addChangeListener(this.handleDragDropStoreChange);
  },

  componentWillUnmount() {
    DragDropStore.removeChangeListener(this.handleDragDropStoreChange);
  }
};

module.exports = DragFeedbackMixin;