(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.EventDispatcher = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}function isEmpty(obj){for(var prop in obj){if(obj.hasOwnProperty(prop)){return false}}return true}var _instanceMap={};var EventDispatcher=function(){function EventDispatcher(){_classCallCheck(this,EventDispatcher);this._eventMap={};this._destroyed=false;this.on=this.bind=this.addEventListener=this.addListener;this.off=this.unbind=this.removeEventListener=this.removeListener;this.once=this.one=this.addListenerOnce;this.emmit=this.trigger=this.dispatchEvent=this.dispatch}EventDispatcher.getInstance=function getInstance(key){if(!key){throw new Error('key must be')}return _instanceMap[key]||(_instanceMap[key]=new EventDispatcher)};EventDispatcher.prototype.addListener=function addListener(event,listener){var listeners=this.getListener(event);if(!listeners){this._eventMap[event]=[listener]}else if(listeners.indexOf(listener)===-1){listeners.push(listener)}return this};EventDispatcher.prototype.addListenerOnce=function addListenerOnce(event,listener){var _this=this,_arguments=arguments;var s=this;var f2=function f2(){s.removeListener(event,f2);return listener.apply(_this,_arguments)};return this.addListener(event,f2)};EventDispatcher.prototype.removeListener=function removeListener(event,listener){if(typeof listener==='undefined'){return this.removeAllListener(event)}var listeners=this.getListener(event);if(listeners){var i=listeners.indexOf(listener);if(i>-1){listeners=listeners.splice(i,1);if(!listeners.length){delete this._eventMap[event]}}}return this};EventDispatcher.prototype.removeAllListener=function removeAllListener(event){var listeners=this.getListener(event);if(listeners){this._eventMap[event].length=0;delete this._eventMap[event]}return this};EventDispatcher.prototype.hasListener=function hasListener(event){return this.getListener(event)!==null};EventDispatcher.prototype.hasListeners=function hasListeners(){return this._eventMap!==null&&this._eventMap!==undefined&&!isEmpty(this._eventMap)};EventDispatcher.prototype.dispatch=function dispatch(eventType,eventObject){var listeners=this.getListener(eventType);if(listeners){eventObject=eventObject||{};eventObject.type=eventType;eventObject.target=eventObject.target||this;var i=-1;while(++i<listeners.length){listeners[i](eventObject)}}return this};EventDispatcher.prototype.getListener=function getListener(event){var result=this._eventMap?this._eventMap[event]:null;return result||null};EventDispatcher.prototype.destroy=function destroy(){if(this._eventMap){for(var i in this._eventMap){this.removeAllListener(i)}this._eventMap=null}this._destroyed=true;return this};return EventDispatcher}();exports.default=EventDispatcher;module.exports=exports['default'];

},{}]},{},[1])(1)
});