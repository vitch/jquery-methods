/*
 * Array prototype extensions. Doesn't depend on any
 * other code. Doens't overwrite existing methods.
 *
 * Adds forEach, every, some, map, filter, indexOf and unique.
 *
 * Copyright (c) 2006 Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */

(function() {
	
	/**
	 * Adds a given method under the given name 
	 * to the Array prototype if it doesn't
	 * currently exist.
	 *
	 * @private
	 */
	function add(name, method) {
		if( !Array.prototype[name] ) {
			Array.prototype[name] = method;
		}
	};
	
	/**
	 * Executes a provided function once per array element.
	 *
	 * @example var stuff = "";
	 * ["foo", "bar"].forEach(function(element, index, array) {
	 *   stuff += element;
	 * });
	 * @result "foobar";
	 *
	 * @param Function handler Function to execute for each element.
	 * @param Object scope (optional) Object to use as 'this' when executing handler.
	 * @name forEach
	 * @type undefined
	 * @cat Plugins/Methods/Array
	 */
	add("forEach", function(handler, scope) {
		scope = scope || window;
		for( var i = 0; i < this.length; i++)
			handler.call(scope, this[i], i, this);
	});
	
	/**
	 * Tests whether all elements in the array pass the test
	 * implemented by the provided function.
	 *
	 * @example [12, 54, 18, 130, 44].every(function(element, index, array) {
	 *   return element >= 10;
	 * });
	 * @result true;
	 *
	 * @example [12, 5, 8, 130, 44].every(function(element, index, array) {
	 *   return element >= 10;
	 * });
	 * @result false;
	 *
	 * @param Function handler Function to execute for each element.
	 * @param Object scope (optional) Object to use as 'this' when executing handler.
	 * @name every
	 * @type Boolean
	 * @cat Plugins/Methods/Array
	 */
	add("every", function(handler, scope) {
		scope = scope || window;
		for( var i = 0; i < this.length; i++)
			if( !handler.call(scope, this[i], i, this) )
				return false;
		return true;
	});
	
	/**
	 * Tests whether at least one element in the array passes the test
	 * implemented by the provided function.
	 *
	 * @example [12, 5, 8, 1, 44].some(function(element, index, array) {
	 *   return element >= 10;
	 * });
	 * @result true;
	 *
	 * @example [2, 5, 8, 1, 4].some(function(element, index, array) {
	 *   return element >= 10;
	 * });
	 * @result false;
	 *
	 * @param Function handler Function to execute for each element.
	 * @param Object scope (optional) Object to use as 'this' when executing handler.
	 * @name some
	 * @type Boolean
	 * @cat Plugins/Methods/Array
	 */
	add("some", function(handler, scope) {
		scope = scope || window;
		for( var i = 0; i < this.length; i++)
			if( handler.call(scope, this[i], i, this) )
				return true;
		return false;
	});
	
	/**
	 * Creates a new array with the results of
	 * calling a provided function on every element in this array.
	 *
	 * @example ["hello", "Array", "WORLD"].map(function(element, index, array) {
	 *   return element.toUpperCase();
	 * });
	 * @result ["HELLO", "ARRAY", "WORLD"];
	 *
	 * @example [1, 4, 9].map(Math.sqrt);
	 * @result [1, 2, 3];
	 *
	 * @param Function handler Function to execute for each element.
	 * @param Object scope (optional) Object to use as 'this' when executing handler.
	 * @name map
	 * @type Array
	 * @cat Plugins/Methods/Array
	 */
	add("map", function(handler, scope) {
		scope = scope || window;
		var r = [];
		for( var i = 0; i < this.length; i++)
			r[r.length] = handler.call(scope, this[i], i, this);
		return r;
	});
	
	/**
	 * Creates a new array with all elements that pass
	 * the test implemented by the provided function.
	 *
	 * @example [12, 5, 8, 1, 44].filter(function(element, index, array) {
	 *   return element >= 10;
	 * });
	 * @result [12, 44];
	 *
	 * @param Function handler Function to execute for each element.
	 * @param Object scope (optional) Object to use as 'this' when executing handler.
	 * @name filter
	 * @type Array
	 * @cat Plugins/Methods/Array
	 */
	add("filter", function(handler, scope) {
		scope = scope || window;
		var r = [];
		for( var i = 0; i < this.length; i++)
			if( handler.call(scope, this[i], i, this) )
				r[r.length] = this[i];
		return r;
	});
	
	/**
	 * Returns the first index at which a given element can
	 * be found in the array, or -1 if it is not present.
	 *
	 * @example [12, 5, 8, 5, 44].indexOf(5);
	 * @result 1;
	 *
	 * @example [12, 5, 8, 5, 44].indexOf(5, 2);
	 * @result 3;
	 *
	 * @param Object subject Object to search for
	 * @param Number offset (optional) Index at which to start searching
	 * @name filter
	 * @type Array
	 * @cat Plugins/Methods/Array
	 */
	add("indexOf", function(subject, offset) {
		for( var i = offset || 0; i < this.length; i++)
			if ( this[i] === subject )
	            return i;
		return -1;
	});
	
	/**
	 * Returns a new array that contains all unique elements
	 * of this array.
	 *
	 * @example [1, 2, 1, 4, 5, 4].unique();
	 * @result [1, 2, 4, 5]
	 *
	 * @name unique
	 * @type Array
	 * @cat Plugins/Methods/Array
	 */
	add("unique", function() {
		return this.filter(function(element, index, array) {
			return array.indexOf(element) >= index;
		});
	});
	
})();