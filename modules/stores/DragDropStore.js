'use strict';

var DragDropDispatcher = require('../dispatcher/DragDropDispatcher'),
    DragDropActionTypes = require('../constants/DragDropActionTypes'),
    createStore = require('../utils/createStore');

var _draggedItem = null,
    _draggedItemType = null,
    _effectsAllowed = null,
    _dragStartOffsetFromContainer = null,
    _dragStartOffsetFromClient = null,
    _dragOffsetFromClient = null,
    _dropEffect = null;

var DragDropStore = createStore({
  isDragging() {
    return !!_draggedItem;
  },

  getEffectsAllowed() {
    return _effectsAllowed;
  },

  getDragStartOffsetFromContainer() {
    return _dragStartOffsetFromContainer;
  },

  getDragStartOffsetFromClient() {
    return _dragStartOffsetFromClient;
  },

  getDragOffsetFromClient() {
    return _dragOffsetFromClient;
  },

  getDropEffect() {
    return _dropEffect;
  },

  getDraggedItem() {
    return _draggedItem;
  },

  getDraggedItemType() {
    return _draggedItemType;
  }
});

DragDropDispatcher.register(function (payload) {
  var { action } = payload;

  switch (action.type) {
  case DragDropActionTypes.DRAG_START:
    _dropEffect = null;
    _draggedItem = action.item;
    _draggedItemType = action.itemType;
    _effectsAllowed = action.effectsAllowed;
    _dragStartOffsetFromContainer = action.offsetFromContainer;
    _dragStartOffsetFromClient = action.offsetFromClient;
    _dragOffsetFromClient = action.offsetFromClient;
    DragDropStore.emitChange();
    break;

  case DragDropActionTypes.DRAG:
    _dragOffsetFromClient = action.offsetFromClient;
    DragDropStore.emitChange();
    break;

  case DragDropActionTypes.DROP:
    _dropEffect = action.dropEffect;
    DragDropStore.emitChange();
    break;

  case DragDropActionTypes.DRAG_END:
    _draggedItem = null;
    _draggedItemType = null;
    _effectsAllowed = null;
    _dropEffect = null;
    _dragStartOffsetFromContainer = null;
    _dragStartOffsetFromClient = null;
    _dragOffsetFromClient = null;
    DragDropStore.emitChange();
    break;
  }
});

module.exports = DragDropStore;