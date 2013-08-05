/** Cz Selection Library
 * @author		Jan Pecha <janpecha@email.cz>, 2013
 * @license		New BSD License
 * @version		2013-02-25-12
 */

var Cz = Cz || {};
Cz.Selection = Cz.Selection || {};

/**
 * Gets selected text.
 * @param	TextArea
 * @return	String
 */
Cz.Selection.getText = function (textarea) {
	return textarea.value.substring(this.getStartPos(textarea), this.getEndPos(textarea));
};



/**
 * Gets selected lines.
 * @param	TextArea
 * @return	String[]
 */
Cz.Selection.getLines = function (textarea) {
	var startPos = this.getStartLinePos(textarea);
	var endPos = this.getEndLinePos(textarea);
	
	return textarea.value.substring(startPos, endPos).replace("\r", '').split("\n");
};



/**
 * Inserts text at (end) position.
 * @param	TextArea
 * @param	String
 * @param	int
 * @return	void
 */
Cz.Selection.insert = function (textarea, text, pos) {
	
	if(typeof pos === "undefined")
	{
		pos = Cz.Selection.getEndPos(textarea);
	}
	
	textarea.value = textarea.value.substring(0, pos) +
		text +
		textarea.value.substring(pos);
};



/**
 * Replaces selected text.
 * @param	TextArea
 * @param	String
 */
Cz.Selection.replace = function (textarea, text, replaceAlways) {
	if(typeof replaceAlways === "undefined")
	{
		replaceAlways = false;
	}
	
	var start = Cz.Selection.getStartPos(textarea);
	var end = Cz.Selection.getEndPos(textarea);
	
	if(start !== end || replaceAlways)
	{
		textarea.value = textarea.value.substring(0, start) +
			text +
			textarea.value.substring(end);
	}
};



/**
 * Wraps selected text.
 * @param	TextArea
 * @param	String  prefix
 * @param	String	suffix
 * @return	void
 */
Cz.Selection.wrap = function (textarea, prefix, suffix) {
	var start = this.getStartPos(textarea);
	var end = this.getEndPos(textarea);
	
	textarea.value = textarea.value.substring(0, start) +
		prefix +
		textarea.value.substring(start, end) +
		suffix +
		textarea.value.substring(end);
	
	// TODO: aby zustal vybran jen uzivatelem vybrany text a ne i prefix|suffix (nastaveni pozice kurzoru)
};



/**
 * Unwraps selected text.
 * @param	TextArea
 * @param	String  prefix
 * @param	String	suffix
 * @return	void
 */
Cz.Selection.unwrap = function (textarea, prefix, suffix) {
	var start = this.getStartPos(textarea);
	var end = this.getEndPos(textarea);
	var value = textarea.value;
	
	// normalize start
	var io = value.substring(start - prefix.length, start + prefix.length).indexOf(prefix);
	if(io >= 0)
	{
		if((start - prefix.length) < 0)
		{
			start += (start - prefix.length) * -1;
		}
		
		start += io;
	}
	
	// normalize end
	io = value.substring(end - suffix.length, end + suffix.length).indexOf(suffix);
	if(io >= 0)
	{
		end -= (suffix.length - io);
	}
	
	var first = textarea.value.substring(0, start);
	var second = textarea.value.substring(end);
	
	var prefixPos = first.lastIndexOf(prefix);
	var suffixPos = second.indexOf(suffix);
	
	textarea.value = first.substring(0, prefixPos) +
		first.substring(prefixPos + prefix.length) +
		textarea.value.substring(start, end) +
		second.substring(0, suffixPos) +
		second.substring(suffixPos + suffix.length);
	// TODO: aby zustal vybran jen uzivatelem vybrany text a ne i prefix|suffix (nastaveni pozice kurzoru)
};



/**
 * Wraps selected lines.
 * @param	TextArea
 * @param	String  prefix
 * @param	String	suffix
 * @param	bool	(optional) FALSE
 * @return	void
 */
Cz.Selection.wrapLines = function (textarea, prefix, suffix, ignoreSpaces) {
	if(typeof ignoreSpaces === "undefined")
	{
		ignoreSpaces = false;
	}
	
	// convert to (bool)
	ignoreSpaces = !!ignoreSpaces;
	
	var start = this.getStartLinePos(textarea);
	var end = this.getEndLinePos(textarea);
	var lines = this.getLines(textarea);
	var res = [];
	var first = textarea.value.substring(0, start - 1);
	
	if(first != '')
	{
		res.push(first);
	}
	
	for(var i = 0; i < lines.length; i++)
	{
		if(!ignoreSpaces)
		{
			res.push(prefix + lines[i] + suffix);
		}
		else
		{
			var trimed = this.trim(lines[i]);
			
			if(trimed == '') // ignore empty lines
			{
				res.push(lines[i]);
				continue;
			}
			
			var trimedLen = trimed.length;
			var firstCharPos = lines[i].indexOf(trimed[0]);
			trimed = prefix + trimed + suffix;
			trimed = lines[i].substring(0, firstCharPos) + trimed;
			trimedLen += firstCharPos;
			trimed += lines[i].substring(trimedLen);
			
			res.push(trimed);
		}
	}
	
	first = textarea.value.substring(end + 1);
	
	if(first != '')
	{
		res.push(first);
	}
	
	textarea.value = res.join("\n");
	// TODO: aby zustal vybran jen uzivatelem vybrany text a ne i prefix|suffix (nastaveni pozice kurzoru)
};



/**
 * Unwraps selected lines.
 * @param	TextArea
 * @param	String  prefix
 * @param	String	suffix
 * @param	bool	(optional) FALSE
 * @return	void
 */
Cz.Selection.unwrapLines = function (textarea, prefix, suffix, ignoreSpaces) {
	if(typeof ignoreSpaces === "undefined")
	{
		ignoreSpaces = false;
	}
	
	ignoreSpaces = !!ignoreSpaces; // convert to (bool)
	
	var start = this.getStartLinePos(textarea);
	var end = this.getEndLinePos(textarea);
	var lines = this.getLines(textarea);
	var res = [];
	var first = textarea.value.substring(0, start - 1);
	
	if(first != '')
	{
		res.push(first);
	}
	
	for(var i = 0; i < lines.length; i++)
	{
		if(!ignoreSpaces)
		{
			if((lines[i].substr(0, prefix.length) === prefix) &&
				(lines[i].substr(lines[i].length - suffix.length) === suffix))
			{
				res.push(lines[i].substring(prefix.length, lines[i].length - suffix.length));
				continue;
			}
			
			res.push(lines[i]);
		}
		else
		{
			var trimed = this.trim(lines[i]);
			prefix = this.ltrim(prefix);
			suffix = this.rtrim(suffix);
			
			// ignore empty lines & lines without prefix or suffix
			if(trimed == '' || (trimed.substring(0, prefix.length) !== prefix || trimed.substring(trimed.length - suffix.length) !== suffix))
			{
				res.push(lines[i]);
				continue;
			}
			
			var trimedLen = trimed.length;
			var firstCharPos = lines[i].indexOf(trimed[0]);
			trimed = trimed.substring(prefix.length, trimed.length - suffix.length);
			trimed = lines[i].substring(0, firstCharPos) + trimed;
			trimedLen += firstCharPos;
			trimed += lines[i].substring(trimedLen);
			
			res.push(trimed);
		}
	}
	
	first = textarea.value.substring(end + 1);
	
	if(first != '')
	{
		res.push(first);
	}
	
	textarea.value = res.join("\n");
};



/**
 * Gets start position of selected text.
 * @param	TextArea
 * @return	int
 * @internal
 */
Cz.Selection.getStartPos = function (textarea) {
	return textarea.selectionStart;
};



/**
 * Gets end position of selected text.
 * @param	TextArea
 * @return	int
 * @internal
 */
Cz.Selection.getEndPos = function (textarea) {
	return textarea.selectionEnd;
};



/**
 * Gets length of selected text.
 * @param	TextArea
 * @return	int
 */
Cz.Selection.getLength = function (textarea) {
	return this.getEndPos(textarea) - this.getStartPos(textarea);
};



/**
 * Gets start position of selected lines.
 * @param	TextArea
 * @return	int
 * @internal
 */
Cz.Selection.getStartLinePos = function (textarea) {
	return textarea.value.substring(0, this.getStartPos(textarea)).lastIndexOf("\n") + 1;
};



/**
 * Gets end position of selected lines.
 * @param	TextArea
 * @return	int
 * @internal
 */
Cz.Selection.getEndLinePos = function (textarea) {
	var selEndPos = this.getEndPos(textarea);
	return selEndPos + textarea.value.substring(selEndPos).indexOf("\n");
};



/**
 * Trims string.
 * @param	String
 * @return	String  trimed string
 * @internal
 */
Cz.Selection.trim = function (str) {
	if(String.prototype.trim)
	{
		return str.trim();
	}
	
	return str.replace(/^\s+|\s+$/g,'');
};



/**
 * Trims string on left.
 * @param	String
 * @return	String  trimed string
 * @internal
 */
Cz.Selection.ltrim = function (str) {
	return str.replace(/^\s+/g,'');
};



/**
 * Trims string on right.
 * @param	String
 * @return	String  trimed string
 * @internal
 */
Cz.Selection.rtrim = function (str) {
	return str.replace(/\s+$/g,'');
};

