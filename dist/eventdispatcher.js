(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.EventDispatcher = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
 'use strict';

 function isEmpty(obj) {
   for (var prop in obj) {
     if (obj.hasOwnProperty(prop)){
       return false;
     }
   }
   return true;
 }

var _instanceMap = {};

 var EventDispatcher = function() {
   this._eventMap = {};
   this._destroyed = false;

   //Method Map
   this.on = this.bind = this.addEventListener = this.addListener;
   this.off = this.unbind = this.removeEventListener = this.removeListener;
   this.once = this.one = this.addListenerOnce;
   this.emmit = this.trigger = this.dispatchEvent = this.dispatch;
 };

 EventDispatcher.getInstance = function(key){
  if(!key){
    throw new Error('key must be');
  }
  return _instanceMap[key] || (_instanceMap[key] =  new EventDispatcher());
 };


 EventDispatcher.prototype.addListener = function(event, listener) {
   var listeners = this.getListener(event);
   if (!listeners) {
     this._eventMap[event] = [listener];
   }else if (listeners.indexOf(listener) === -1) {
     listeners.push(listener);
   }
   return this;
 };

 EventDispatcher.prototype.addListenerOnce = function(event, listener) {
   var s = this;
   var f2 = function() {
     s.removeListener(event, f2);
     return listener.apply(this, arguments);
   };
   return this.addListener(event, f2);
 };

 EventDispatcher.prototype.removeListener = function(event, listener) {

  if(typeof listener === 'undefined'){
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
 };

 EventDispatcher.prototype.removeAllListener = function(event) {
   var listeners = this.getListener(event);
   if (listeners) {
     this._eventMap[event].length = 0;
     delete(this._eventMap[event]);
   }
   return this;
 };

 EventDispatcher.prototype.hasListener = function(event) {
   return this.getListener(event) !== null;
 };

 EventDispatcher.prototype.hasListeners = function() {
   return (this._eventMap !== null && this._eventMap !== undefined && !isEmpty(this._eventMap));
 };

 EventDispatcher.prototype.dispatch = function(eventType, eventObject) {
   var listeners = this.getListener(eventType);

   if (listeners) {
     eventObject = eventObject || {};
     eventObject.type = eventType;
     eventObject.target = eventObject.target || this;

     var i = -1;
     while (++i < listeners.length) {
       listeners[i](eventObject);
     }
     // return true;
   }
   return this;
 };

 EventDispatcher.prototype.getListener = function(event) {
   var result = this._eventMap ? this._eventMap[event] : null;
   return (result || null);
 };

 EventDispatcher.prototype.destroy = function() {
   if (this._eventMap) {
     for (var i in this._eventMap) {
       this.removeAllListener(i);
     }
     this._eventMap = null;
   }
   this._destroyed = true;
   return this;
 };

 module.exports = EventDispatcher;

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIiAndXNlIHN0cmljdCc7XG5cbiBmdW5jdGlvbiBpc0VtcHR5KG9iaikge1xuICAgZm9yICh2YXIgcHJvcCBpbiBvYmopIHtcbiAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSl7XG4gICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICB9XG4gICB9XG4gICByZXR1cm4gdHJ1ZTtcbiB9XG5cbnZhciBfaW5zdGFuY2VNYXAgPSB7fTtcblxuIHZhciBFdmVudERpc3BhdGNoZXIgPSBmdW5jdGlvbigpIHtcbiAgIHRoaXMuX2V2ZW50TWFwID0ge307XG4gICB0aGlzLl9kZXN0cm95ZWQgPSBmYWxzZTtcblxuICAgLy9NZXRob2QgTWFwXG4gICB0aGlzLm9uID0gdGhpcy5iaW5kID0gdGhpcy5hZGRFdmVudExpc3RlbmVyID0gdGhpcy5hZGRMaXN0ZW5lcjtcbiAgIHRoaXMub2ZmID0gdGhpcy51bmJpbmQgPSB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSB0aGlzLnJlbW92ZUxpc3RlbmVyO1xuICAgdGhpcy5vbmNlID0gdGhpcy5vbmUgPSB0aGlzLmFkZExpc3RlbmVyT25jZTtcbiAgIHRoaXMuZW1taXQgPSB0aGlzLnRyaWdnZXIgPSB0aGlzLmRpc3BhdGNoRXZlbnQgPSB0aGlzLmRpc3BhdGNoO1xuIH07XG5cbiBFdmVudERpc3BhdGNoZXIuZ2V0SW5zdGFuY2UgPSBmdW5jdGlvbihrZXkpe1xuICBpZigha2V5KXtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2tleSBtdXN0IGJlJyk7XG4gIH1cbiAgcmV0dXJuIF9pbnN0YW5jZU1hcFtrZXldIHx8IChfaW5zdGFuY2VNYXBba2V5XSA9ICBuZXcgRXZlbnREaXNwYXRjaGVyKCkpO1xuIH07XG5cblxuIEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCwgbGlzdGVuZXIpIHtcbiAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLmdldExpc3RlbmVyKGV2ZW50KTtcbiAgIGlmICghbGlzdGVuZXJzKSB7XG4gICAgIHRoaXMuX2V2ZW50TWFwW2V2ZW50XSA9IFtsaXN0ZW5lcl07XG4gICB9ZWxzZSBpZiAobGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpID09PSAtMSkge1xuICAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICB9XG4gICByZXR1cm4gdGhpcztcbiB9O1xuXG4gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lck9uY2UgPSBmdW5jdGlvbihldmVudCwgbGlzdGVuZXIpIHtcbiAgIHZhciBzID0gdGhpcztcbiAgIHZhciBmMiA9IGZ1bmN0aW9uKCkge1xuICAgICBzLnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBmMik7XG4gICAgIHJldHVybiBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgfTtcbiAgIHJldHVybiB0aGlzLmFkZExpc3RlbmVyKGV2ZW50LCBmMik7XG4gfTtcblxuIEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCwgbGlzdGVuZXIpIHtcblxuICBpZih0eXBlb2YgbGlzdGVuZXIgPT09ICd1bmRlZmluZWQnKXtcbiAgICByZXR1cm4gdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcihldmVudCk7XG4gIH1cblxuICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuZ2V0TGlzdGVuZXIoZXZlbnQpO1xuICAgaWYgKGxpc3RlbmVycykge1xuICAgICB2YXIgaSA9IGxpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcbiAgICAgaWYgKGkgPiAtMSkge1xuICAgICAgIGxpc3RlbmVycyA9IGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgaWYgKCFsaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICBkZWxldGUodGhpcy5fZXZlbnRNYXBbZXZlbnRdKTtcbiAgICAgICB9XG4gICAgIH1cbiAgIH1cbiAgIHJldHVybiB0aGlzO1xuIH07XG5cbiBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLmdldExpc3RlbmVyKGV2ZW50KTtcbiAgIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAgdGhpcy5fZXZlbnRNYXBbZXZlbnRdLmxlbmd0aCA9IDA7XG4gICAgIGRlbGV0ZSh0aGlzLl9ldmVudE1hcFtldmVudF0pO1xuICAgfVxuICAgcmV0dXJuIHRoaXM7XG4gfTtcblxuIEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUuaGFzTGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgcmV0dXJuIHRoaXMuZ2V0TGlzdGVuZXIoZXZlbnQpICE9PSBudWxsO1xuIH07XG5cbiBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLmhhc0xpc3RlbmVycyA9IGZ1bmN0aW9uKCkge1xuICAgcmV0dXJuICh0aGlzLl9ldmVudE1hcCAhPT0gbnVsbCAmJiB0aGlzLl9ldmVudE1hcCAhPT0gdW5kZWZpbmVkICYmICFpc0VtcHR5KHRoaXMuX2V2ZW50TWFwKSk7XG4gfTtcblxuIEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUuZGlzcGF0Y2ggPSBmdW5jdGlvbihldmVudFR5cGUsIGV2ZW50T2JqZWN0KSB7XG4gICB2YXIgbGlzdGVuZXJzID0gdGhpcy5nZXRMaXN0ZW5lcihldmVudFR5cGUpO1xuXG4gICBpZiAobGlzdGVuZXJzKSB7XG4gICAgIGV2ZW50T2JqZWN0ID0gZXZlbnRPYmplY3QgfHwge307XG4gICAgIGV2ZW50T2JqZWN0LnR5cGUgPSBldmVudFR5cGU7XG4gICAgIGV2ZW50T2JqZWN0LnRhcmdldCA9IGV2ZW50T2JqZWN0LnRhcmdldCB8fCB0aGlzO1xuXG4gICAgIHZhciBpID0gLTE7XG4gICAgIHdoaWxlICgrK2kgPCBsaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgbGlzdGVuZXJzW2ldKGV2ZW50T2JqZWN0KTtcbiAgICAgfVxuICAgICAvLyByZXR1cm4gdHJ1ZTtcbiAgIH1cbiAgIHJldHVybiB0aGlzO1xuIH07XG5cbiBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLmdldExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgIHZhciByZXN1bHQgPSB0aGlzLl9ldmVudE1hcCA/IHRoaXMuX2V2ZW50TWFwW2V2ZW50XSA6IG51bGw7XG4gICByZXR1cm4gKHJlc3VsdCB8fCBudWxsKTtcbiB9O1xuXG4gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gICBpZiAodGhpcy5fZXZlbnRNYXApIHtcbiAgICAgZm9yICh2YXIgaSBpbiB0aGlzLl9ldmVudE1hcCkge1xuICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXIoaSk7XG4gICAgIH1cbiAgICAgdGhpcy5fZXZlbnRNYXAgPSBudWxsO1xuICAgfVxuICAgdGhpcy5fZGVzdHJveWVkID0gdHJ1ZTtcbiAgIHJldHVybiB0aGlzO1xuIH07XG5cbiBtb2R1bGUuZXhwb3J0cyA9IEV2ZW50RGlzcGF0Y2hlcjtcbiJdfQ==
