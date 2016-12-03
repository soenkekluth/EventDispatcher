import EventDispatcher from '../src/eventdispatcher';

const handler = function(event) {
  console.log(' >> ' + event.type + ' was triggered');
};

const dispatcher = new EventDispatcher();

console.log('dispatcher.listens', dispatcher.listens());
console.log('dispatcher.on(evt1).....');

dispatcher.on('evt1', handler);
console.log('dispatcher.listens', dispatcher.listens());
console.log('dispatcher.listens(evt1)', dispatcher.listens('evt1'));
console.log('dispatcher.listens(evt2)', dispatcher.listens('evt2'));
console.log('dispatcher.on(evt2).....');
dispatcher.on('evt2', handler);
console.log('dispatcher.on(evt2).....');
dispatcher.on('evt2', handler);
console.log('dispatcher.on(evt2).....');
dispatcher.on('evt2', handler);

console.log('trigger(evt2)');
dispatcher.trigger('evt2');

console.log('dispatcher.once(test).....');
dispatcher.once('test', handler);

console.log('trigger(test)');
console.log('trigger(test)');
console.log('trigger(test)');
console.log('trigger(test)');
console.log('trigger(test)');
dispatcher.trigger('test');
dispatcher.trigger('test');
dispatcher.trigger('test');
dispatcher.trigger('test');
dispatcher.trigger('test');

console.log('dispatcher.once(evt2).....');
dispatcher.once('evt2', handler);


console.log('dispatcher.listens(evt2)', dispatcher.listens('evt2'));

console.log('trigger(evt1)');
dispatcher.trigger('evt1');
console.log('trigger(evt2)');
dispatcher.trigger('evt2');

console.log('trigger(evt2)');
dispatcher.trigger('evt2');

console.log('dispatcher.off(evt2)');
dispatcher.off('evt2');

console.log('trigger(evt1)');
dispatcher.trigger('evt1');
console.log('trigger(evt2)');
dispatcher.trigger('evt2');

console.log('destroy');
dispatcher.destroy();

console.log('trigger(evt1)');
dispatcher.trigger('evt1');
console.log('trigger(evt2)');
dispatcher.trigger('evt2');


dispatcher.trigger('evt1');
dispatcher.trigger('evt2');

console.log('dispatcher.listens', dispatcher.listens());
