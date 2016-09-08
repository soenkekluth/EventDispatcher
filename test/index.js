//TODO implement real test.
// this is just for the fast fun!

var EventDispatcher = require('../dist/eventdispatcher');

var handler = function(event) {
  console.log(event.type + ' was triggered');
};

var dispatcher = new EventDispatcher();
console.log('dispatcher.hasListeners', dispatcher.hasListeners());

console.log('dispatcher.on(evt1).....', dispatcher.on('evt1', handler));
console.log('dispatcher.hasListeners', dispatcher.hasListeners());
console.log('dispatcher.hasListener(evt1)', dispatcher.hasListener('evt1'));
console.log('dispatcher.hasListener(evt2)', dispatcher.hasListener('evt2'));
console.log('dispatcher.on(evt2).....', dispatcher.on('evt2', handler));
console.log('dispatcher.on(evt2).....', dispatcher.on('evt2', handler));
console.log('dispatcher.on(evt2).....', dispatcher.on('evt2', handler));
console.log('dispatcher.on(evt2).....', dispatcher.on('evt2', handler));


console.log('dispatcher.hasListener(evt2)', dispatcher.hasListener('evt2'));

console.log('trigger(evt1)', dispatcher.trigger('evt1'));
console.log('trigger(evt2)', dispatcher.trigger('evt2'));

console.log('dispatcher.off(evt2)', dispatcher.off('evt2'));
console.log('dispatcher.off(evt2)', dispatcher.off('evt2'));
console.log('dispatcher.off(evt2)', dispatcher.off('evt2'));

console.log('trigger(evt1)', dispatcher.trigger('evt1'));
console.log('trigger(evt2)', dispatcher.trigger('evt2'));

console.log('tdestroy', dispatcher.destroy());

console.log('trigger(evt1)', dispatcher.trigger('evt1'));
console.log('trigger(evt2)', dispatcher.trigger('evt2'));


dispatcher.trigger('evt1');
dispatcher.trigger('evt2');

console.log('dispatcher.hasListeners', dispatcher.hasListeners());
