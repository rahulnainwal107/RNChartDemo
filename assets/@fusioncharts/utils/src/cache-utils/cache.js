"use strict";exports.__esModule=true;exports.CacheStoreAsync=exports.default=void 0;var DEFAULT_DB_NAME="FC_IndexedDB";var CacheStoreSync=function(){function CacheStoreSync(){this._cache={}}var _proto=CacheStoreSync.prototype;_proto.get=function get(key){return this._cache[key]};_proto.set=function set(key,value){this._cache[key]=value};_proto.includes=function includes(key){return this._cache[key]!==null&&typeof this._cache[key]!=="undefined"};_proto.remove=function remove(key){if(this._cache[key]){delete this._cache[key]}};_proto.dispose=function dispose(){delete this._cache};return CacheStoreSync}();var CacheStoreAsync=function(){function CacheStoreAsync(dbName){var _this=this;var indexedDB=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB;this.isIndexedDB=true;return new Promise((function(resolve){if(window.indexedDB){_this.dbName=dbName||DEFAULT_DB_NAME;var _getUniqueName=function _getUniqueName(name,suffix,objStoreNames){var counter=1;while(objStoreNames.contains(name+"_"+suffix+"_"+counter)){counter++}return name+"_"+suffix+"_"+counter},openRequest=indexedDB.open(_this.dbName);openRequest.onerror=function(){_this._nonIndexedDBInit();resolve(_this)};openRequest.onsuccess=function(){_this.db=openRequest.result;_this.storeName=_this.db.name+"_store_1";resolve(_this)};openRequest.onupgradeneeded=function(e){_this.db=e.target.result;_this.storeName=_getUniqueName(_this.db.name,"store",_this.db.objectStoreNames);_this.db.createObjectStore(_this.storeName,{keyPath:"key"});resolve(_this)}}else{_this._nonIndexedDBInit();resolve(_this)}}))}var _proto2=CacheStoreAsync.prototype;_proto2._nonIndexedDBInit=function _nonIndexedDBInit(){this.isIndexedDB=false;this._cache={}};_proto2.get=function get(key){var _this2=this;return new Promise((function(resolve,reject){if(_this2.isIndexedDB){var store=_this2.db.transaction([_this2.storeName],"readwrite").objectStore(_this2.storeName),getRequest=store.get(key);getRequest.onerror=function(e){reject(e)};getRequest.onsuccess=function(e){if(getRequest.result&&getRequest.result.value){resolve(getRequest.result.value)}else{reject(e)}}}else{resolve(_this2._cache[key])}}))};_proto2.set=function set(key,value){var _this3=this;return new Promise((function(resolve,reject){if(_this3.isIndexedDB){var data={key:key,value:value},store,addRequest;store=_this3.db.transaction([_this3.storeName],"readwrite").objectStore(_this3.storeName);try{addRequest=store.put(data);addRequest.onerror=function(e){reject(e)};addRequest.onsuccess=function(e){resolve(e)}}catch(e){reject(e)}}else{_this3._cache[key]=value;resolve()}}))};_proto2.includes=function includes(key){var _this4=this;return new Promise((function(resolve){_this4.get(key).then((function(value){if(value!==null&&typeof value!=="undefined"){resolve(true)}else{resolve(false)}}))["catch"]((function(){resolve(false)}))}))};_proto2.remove=function remove(key){var _this5=this;return new Promise((function(resolve){if(_this5.indexedDB){var deleteRequest=_this5.db.transaction([_this5.storeName],"readwrite").objectStore(_this5.storeName)["delete"](key);deleteRequest.onsuccess=function(){resolve(true)};deleteRequest.onerror=function(){resolve(false)}}else{if(_this5._cache[key]){delete _this5._cache[key]}resolve(true)}}))};_proto2.dispose=function dispose(){var _this6=this;return new Promise((function(resolve){if(_this6.isIndexedDB){var deleteDBReq=indexedDB.deleteDatabase(_this6.dbName);deleteDBReq.onsuccess=function(){resolve(true)};deleteDBReq.onerror=function(){resolve(false)};deleteDBReq.onblocked=function(){resolve(false)}}else{delete _this6._cache;resolve(true)}}))};return CacheStoreAsync}();exports.CacheStoreAsync=CacheStoreAsync;var _default=CacheStoreSync;exports.default=_default;