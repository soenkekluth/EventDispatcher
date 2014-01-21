/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Sönke Kluth
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 **/

(function(exports) {

    'use strict';


    //IE8
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(obj, start) {
            for (var i = (start || 0), j = this.length; i < j; i++) {
                if (this[i] === obj) {
                    return i;
                }
            }
            return -1;
        }
    }

    var EventDispatcher = function() {

    };

    EventDispatcher.prototype = {

        _eventMap: {},
        _destroyed: false,

        addListener: function(event, listener) {

            this.getListener(event) || (this._eventMap[event] = []);

            if (this.getListener(event).indexOf(listener) == -1) {
                this._eventMap[event].push(listener);
            }

            return this;
        },


        addListenerOnce: function(event, listener) {
            var s = this;
            var f2 = function() {
                s.removeListener(event, f2);
                return listener.apply(this, arguments);
            };
            return this.addListener(event, f2);
        },

        removeListener: function(event, listener) {

            var listeners = this.getListener(event);
            if (listeners) {
                var i = listeners.indexOf(listener);
                if (i > -1) {
                    this._eventMap[event] = listeners.splice(i, 1);
                    if (listeners.length === 0) {
                        delete(this._eventMap[event]);
                    }
                }
            }

            return this;
        },


        removeAllListener: function(event) {

            var listeners = this.getListener(event);
            if (listeners) {
                this._eventMap[event].length = 0;
                delete(this._eventMap[event]);
            }
            return this;
        },



        dispatch: function(event, eventObject) {

            var listeners = this.getListener(event);

            if (listeners) {

                //var args = Array.prototype.slice.call(arguments, 1);
                eventObject = (eventObject) ? eventObject : {};
                eventObject.type = event;
                eventObject.target = eventObject.target || this;
                var i = -1;
                while (++i < listeners.length) {

                    //args ? listeners[i].apply(null, args) : listeners[i]();
                    listeners[i].call(null, eventObject);
                }
            } else {
                // console.info('Nobody is listening to ' + event);
            }

            return this;
        },

        getListener: function(event) {
            if (this._destroyed) {
                throw new Error('I am destroyed');
            }
            return this._eventMap[event];
        },

        destroy: function() {
            if (this._eventMap) {
                for (var i in this._eventMap) {
                    this.removeAllListener(i);
                }
                //TODO leave an empty object is better then throwing an error when using a fn after destroy?
                this._eventMap = null;
            }
            this._destroyed = true;
        }
    };

    //Method Map
    EventDispatcher.prototype.on = EventDispatcher.prototype.bind = EventDispatcher.prototype.addEventListener = EventDispatcher.prototype.addListener;
    EventDispatcher.prototype.off = EventDispatcher.prototype.unbind = EventDispatcher.prototype.removeEventListener = EventDispatcher.prototype.removeListener;
    EventDispatcher.prototype.once = EventDispatcher.prototype.one = EventDispatcher.prototype.addListenerOnce;
    EventDispatcher.prototype.trigger = EventDispatcher.prototype.dispatchEvent = EventDispatcher.prototype.dispatch;

    (typeof module != "undefined" && module.exports) ? (module.exports = EventDispatcher) : (typeof define != "undefined" ? (define(function() {
        return EventDispatcher;
    })) : (exports.EventDispatcher = EventDispatcher));

})(this);
