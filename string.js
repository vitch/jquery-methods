/*
 * String prototype extensions. Doesn't depend on any
 * other code. Doens't overwrite existing methods.
 *
 * Adds trim, camelize, startsWith, endsWith, truncate and stripTags.
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
	 * to the String prototype if it doesn't
	 * currently exist.
	 *
	 * @private
	 */
	function add(name, method) {
		if( !String.prototype[name] ) {
			String.prototype[name] = method;
		}
	}
	
	/**
	 * Returns a string with with leading and trailing whitespace removed.
	 *
	 * @example " Hello Boys and Girls!   ".trim()
	 * @result "Hello Boys and Girls!"
	 *
	 * @name trim
	 * @type String
	 * @cat Plugins/Methods/String
	 */
	add("trim", function(){ 
		return this.replace(/(^\s+|\s+$)/g, "");
	});
	
	/**
	 * Return a camelized String, removing all underscores and dashes
	 * and replacing the next character with it's uppercase representation.
	 *
	 * @example "font-weight".camelize()
	 * @result "fontWeight"
	 *
	 * @example "border_width_bottom".camelize()
	 * @result "borderWidthBottom"
	 *
	 * @example "border_width-bottom".camelize()
	 * @result "borderWidthBottom"
	 *
	 * @name camelize
	 * @type String
	 * @cat Plugins/Methods/String
	 */
	add("camelize", function() {
		return this.replace( /[-_]([a-z])/ig, function(z,b){ return b.toUpperCase();} );
	});
	
	/**
	 * Tests if this string starts with a prefix.
	 *
	 * An optional offset specifies where to start searching,
	 * default is 0 (start of the string).
	 *
	 * Returns false if the offset is negative or greater than the length
	 * of this string.
	 *
	 * @example "goldvein".startsWith("go")
	 * @result true
	 * 
	 * @example "goldvein".startsWith("god")
	 * @result false
	 *
	 * @example "goldvein".startsWith("ld", 2)
	 * @result true
	 * 
	 * @example "goldvein".startsWith("old", 2)
	 * @result false
	 *
	 * @name startsWith
	 * @type Boolean
	 * @param prefix The prefix to test
	 * @param offset (optional) From where to start testing
	 * @cat Plugins/Methods/String
	 */
	
	add("startsWith", function(prefix, offset) {
		var offset = offset || 0;
		if(offset < 0 || offset > this.length) return false;
		return this.substring(offset, offset + prefix.length) == prefix;
	});
	
	/**
	 * Tests if this string ends with the specified suffix.
	 *
	 * @example "goldvein".endsWith("ein")
	 * @result true
	 *
	 * @example "goldvein".endsWith("vei")
	 * @result false
	 *
	 * @name endsWith
	 * @type Boolean
	 * @param suffix The suffix to test
	 * @cat Plugins/Methods/String
	 */
	add("endsWith", function(suffix) {
		return this.substring(this.length - suffix.length) == suffix;
	});
	
	/**
	 * Returns a new String that is no longer than a certain length.
	 *
	 * @example "thisistenc ".truncate(5);
	 * @result "th..."
	 *
	 * @example "thisistenc ".truncate(5, "x")
	 * @result "thisx"
	 *
	 * @name truncate
	 * @type String
	 * @param Number length (optional) The maximum length of the returned string, default is 30
	 * @param String suffix (optional) The suffix to append to the truncated string, default is "..."
	 * @cat Plugins/Methods/String
	 */
	add("truncate", function(length, suffix) {
		length = length || 30;
		suffix = suffix === undefined ? "..." : suffix;
		return this.length > length ? 
			this.slice(0, length - suffix.length) + suffix : this;
	});
	
	/**
	 * Returns a new String with all tags stripped.
	 *
	 * @example "<div id='hi'>Bla</div>".stripTags()
	 * @result "Bla"
	 *
	 * @name stripTags
	 * @type String
	 * @cat Plugins/Methods/String
	 */
	add("stripTags", function() {
		return this.replace(/<\/?[^>]+>/gi, '');
	});

})();