/**
 * Reset model events
 */

'use strict';

import {EventEmitter} from 'events';
import Reset from './reset.model';
var ResetEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ResetEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Reset.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ResetEvents.emit(event + ':' + doc._id, doc);
    ResetEvents.emit(event, doc);
  };
}

export default ResetEvents;
