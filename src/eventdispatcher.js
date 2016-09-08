 'use strict';

 function isEmpty(obj) {
   for (var prop in obj) {
     if (obj.hasOwnProperty(prop)) {
       return false;
     }
   }
   return true;
 }

 var _instanceMap = {};

 export default class EventDispatcher {

   constructor() {
     this._eventMap = {};
     this._destroyed = false;

     this.on = this.bind = this.addEventListener = this.addListener;
     this.off = this.unbind = this.removeEventListener = this.removeListener;
     this.once = this.one = this.addListenerOnce;
     this.emit = this.trigger = this.dispatchEvent = this.dispatch;
   }

   static getInstance(key) {
     if (!key) {
       throw new Error('key must be');
     }
     return _instanceMap[key] || (_instanceMap[key] = new EventDispatcher());
   };


   addListener(event, listener) {
     var listeners = this.getListener(event);
     if (!listeners) {
       this._eventMap[event] = [listener];
     } else if (listeners.indexOf(listener) === -1) {
       listeners.push(listener);
     }
     return this;
   }

   addListenerOnce(event, listener) {
     var f2 = (e) => {
       listener(e);
       this.off(event, f2);
       listener = null;
       f2 = null;
     };
     return this.on(event, f2);
   }

   removeListener(event, listener) {

     if (!listener) {
       return this.removeAllListener(event);
     }

     var listeners = this.getListener(event);
     if (listeners) {
       var i = listeners.indexOf(listener);
       if (i > -1) {
         listeners = listeners.splice(i, 1);
         if (!listeners.length) {
           delete(this._eventMap[event]);
         }
       }
     }
     return this;
   }

   removeAllListener(event) {
     var listeners = this.getListener(event);
     if (listeners) {
       this._eventMap[event].length = 0;
       delete(this._eventMap[event]);
     }
     return this;
   }

   hasListener(event) {
     return this.getListener(event) !== null;
   }

   hasListeners() {
     return (this._eventMap !== null && this._eventMap !== undefined && !isEmpty(this._eventMap));
   }

   dispatch(eventType, eventObject) {
     var listeners = this.getListener(eventType);

     if (listeners) {
       eventObject = eventObject || {};
       eventObject.type = eventType;
       // eventObject.stopPropagation = ()=> {
       //  eventObject._stopPropagation = true;
       // };
       eventObject.target = eventObject.target || this;

       var i = -1;
       while (++i < listeners.length) {
         listeners[i](eventObject);
       }
     }
     return this;
   }

   getListener(event) {
     var result = this._eventMap ? this._eventMap[event] : null;
     return (result || null);
   }

   destroy() {
     if (this._eventMap) {
       for (var i in this._eventMap) {
         this.removeAllListener(i);
       }
       this._eventMap = null;
     }
     this._destroyed = true;
     return this;
   }
 }
