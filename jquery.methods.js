/**
 * @author paul.bakaus
 */
jQuery.extend(
	jQuery.fn,
	{
		arrays: function(c) {
			var ar = c;
			ar.dataAr = c;
			
			/* Methods Start */
			ar.without = function(ex){
				newAr = [];
				for(var i=0; i< ar.dataAr.length; i++) {
					if (ar.dataAr[i] != ex) {
						newAr[newAr.length] = ar.dataAr[i];
					}
				}
				ar = jQuery.fn.arrays(newAr);
				return ar;
			}
			ar.clear = function() {
				ar.dataAr.length = 0;
				return ar.dataAr;
			}
			ar.first = function() {
				return ar.dataAr[0];
			}
			ar.last = function() {
				return ar.dataAr[ar.dataAr.length - 1];
			}
			ar.indexOf = function(object) {
				for (var i = 0, length = ar.dataAr.length; i < length; i++)
				if (ar.dataAr[i] == object) return i;
				return -1;
			}
			ar.unique = function() {
				var newAr = [];
				for(var i=0;i<ar.dataAr.length;i++)
					if(jQuery.fn.arrays(newAr).indexOf(ar.dataAr[i]) == -1) newAr.push(ar.dataAr[i]);

				ar = jQuery.fn.arrays(newAr);
				return ar;
			}
			ar.rand = function() {
				return ar.dataAr[parseInt(Math.random()*ar.dataAr.length)];
			}
			/* Methods End */


			return ar;
		},
		strings: function(c) {
			var st = new String(c);
			st.dataSt = c;
			
			/* Methods Start */
			st.truncate = function(length, truncation) {
				length = length || 30;
				truncation = truncation === undefined ? '...' : truncation;
				return st.dataSt.length > length ? 
				st.dataSt.slice(0, length - truncation.length) + truncation : st.dataSt;
			}
			st.trim = function() {
				return st = jQuery.fn.strings(st.dataSt.replace(/^\s+/, '').replace(/\s+$/, ''));
			}
  			st.stripTags = function() {
				return st = jQuery.fn.strings(st.dataSt.replace(/<\/?[^>]+>/gi, ''));
			}
			/* Methods End */

			return st;
		},
	}
);
$A = jQuery.fn.arrays;
$S = jQuery.fn.strings;